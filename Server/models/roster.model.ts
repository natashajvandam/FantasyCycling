import { Rider } from "Types/riders";
import client from "./index.model";
import convertToPgDate from "helpers/convertDate";
import queries from "queries/rosterQueries";

const changeUserTeam = async (id: number, newName: string) => {
  // --takes: userId, new team name | returns: { id: userId }
  const newer = newName.replaceAll("'", "''");
  const user = await client.query(queries.CHANGE_TEAM_NAME(newer, id));
  return user;
};

// -helper
const getResultingMoney = async (
  id: number,
  rider: Rider,
  spending: boolean
) => {
  const money = await client.query(queries.GET_MONEY(id));
  const price = await client.query(queries.GET_PRICE(rider));
  return spending
    ? money.rows[0].money - price.rows[0].price
    : money.rows[0].money + price.rows[0].price;
};

const addRiderToRoster = async (id: number, rider: Rider) => {
  // --takes: userId, riderId | returns: whether successful
  const newMoneyAmount = await getResultingMoney(id, rider, true);
  const date = convertToPgDate();
  if (newMoneyAmount >= 0) {
    // - if enough money, attempt to add userId and added_at to rider_table
    // use more descriptive names
    const addRider = await client.query(queries.ADD_RIDER(id, date, rider));
    if (addRider.rowCount > 0) {
      // - if successful, add rider name, userId, start_date to roster_table AND update user_table money
      const riderName = addRider.rows[0].name;
      await client.query(queries.UPDATE_ROSTER(id, riderName, date));
      const resOfPaying = await client.query(
        queries.UPDATE_MONEY(newMoneyAmount, id)
      );
      return resOfPaying;
    }
    return addRider;
  }
  return false;
};

const removeRiderFromRoster = async (id: number, rider: Rider) => {
  const newMoneyAmount = await getResultingMoney(id, rider, false);
  const resOfRemoving = await client.query(
    queries.REMOVE_FROM_ROSTER(rider, id)
  );
  if (resOfRemoving.rowCount > 0) {
    const riderName = resOfRemoving.rows[0].name;
    const date = convertToPgDate();
    await client.query(queries.UPDATE_ROSTER_DATE(date, id, riderName));
    const resOfMoney = await client.query(
      queries.UPDATE_MONEY(newMoneyAmount, id)
    );
    return resOfMoney;
  }
  return "cannot remove";
};

export { addRiderToRoster, removeRiderFromRoster, changeUserTeam };
