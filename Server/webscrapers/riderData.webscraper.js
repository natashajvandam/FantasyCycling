import got from "got";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const fetchRiderData = async (url) => {
  const list = await got(url).then( async (response) => {
    const dom = new JSDOM(response.body);
    // Riders, an array elements.
    let riders = [...dom.window.document.querySelectorAll("table > tbody tr")];
    // Get each column of stats for each rider.
    riders = await Promise.all(riders.map((rider) => {
      console.log(rider);
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
    }));
    console.log(riders);
    return riders;
  }).catch(error => console.log(error));
  return list;
};

export default fetchRiderData;