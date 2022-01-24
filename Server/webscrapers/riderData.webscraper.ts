// eslint-disable-next-line import/no-unresolved
import got from "got";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

const fetchRiderData = async (url: string) => {
  const data = await got(url)
    .then((response) => {
      const dom = new JSDOM(response.body);
      // Riders, an array elements.
      const riders = [
        ...dom.window.document.querySelectorAll("table > tbody tr"),
      ];
      // Get each column of stats for each rider.
      const ridersMap = riders.map((rider) => {
        const [rankElem, prevElem, nextElem, riderElem, teamElem, scoreElem] =
          rider.querySelectorAll("td");

        return {
          rank: rankElem.textContent as string,
          prev: prevElem.textContent as string,
          next: nextElem.textContent as string,
          rider: riderElem.textContent as string,
          team: teamElem.textContent as string,
          score: scoreElem.textContent as string,
        };
      });
      return ridersMap;
    })
    .catch((error) => {
      throw new Error(error);
    });
  return data;
};

export default fetchRiderData;
