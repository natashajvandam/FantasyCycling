import got from "got";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const url = "https://www.procyclingstats.com/rankings.php";
const fetchRiderData = async () => {
  const data = await got(url).then((response) => {
    const dom = new JSDOM(response.body);
    // Riders, an array elements.
    let riders = [...dom.window.document.querySelectorAll("table > tbody tr")];
    // Get each column of stats for each rider.
    riders = riders.map((rider) => {
      const [
        rankElem,
        prevElem,
        nextElem,
        riderElem,
        teamElem,
        scoreElem
      ] = rider.querySelectorAll("td");

      return {
        rank: rankElem.textContent,
        prev: prevElem.textContent,
        next: nextElem.textContent,
        rider: riderElem.textContent,
        team: teamElem.textContent,
        score: scoreElem.textContent
      };
    });
    return riders;
  }).catch(error => console.log(error));
  return data;
};

export default fetchRiderData;