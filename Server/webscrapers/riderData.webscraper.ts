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
          rank: rankElem.textContent,
          prev: prevElem.textContent,
          next: nextElem.textContent,
          rider: riderElem.textContent,
          team: teamElem.textContent,
          score: scoreElem.textContent,
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
