import got from "got";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const fetchRiderPhoto = async (names) => {
  const linkAndName = names.map(async (name) => {
    try {
      const dom = await getDomElement(name);
      const link = await findImageLink(dom);
      const pnts = await findPoints(dom);
      const nextRace = await findUpComing(dom);
      return { image: link, rider: name.rider, pnts: pnts, nextRace: nextRace };
    } catch (error) {
      console.log("error fetching riderPhoto", error);
      return {
        image: undefined,
        rider: name.rider,
        pnts: 0,
        nextRace: undefined,
      };
    }
  });
  const loadedimages = await Promise.all(linkAndName);
  return loadedimages;
};

const getDomElement = async (name) => {
  const url = `https://www.procyclingstats.com/rider/${name.firstName}${name.lastNames}`;
  const data = await got(url);
  return data;
};

const findImageLink = async (response) => {
  const dom = new JSDOM(response.body);
  let photoLink = [
    ...dom.window.document.querySelectorAll(
      "body > div.wrapper > div.content > div.page-content.page-object.default > div:nth-child(2) > div.left.w75.mb_w100 > div.left.w50.mb_w100 > div.rdr-img-cont > a > img"
    ),
  ];
  if (photoLink.length) {
    const image = photoLink[0];
    return image.src;
  } else {
    return undefined;
  }
};

const findPoints = async (response) => {
  const dom = new JSDOM(response.body);
  let points = [...dom.window.document.getElementsByClassName("pnt")];
  const pointsArray = [];
  for (let i = 0; i < points.length; i++) {
    // console.log(points[i].textContent)
    pointsArray.push(points[i].textContent);
  }
  return pointsArray;
};

const findUpComing = async (response) => {
  const dom = new JSDOM(response.body);
  let upcoming = [...dom.window.document.getElementsByClassName("ellipsis")];
  if (upcoming.length) {
    console.log(upcoming[0].textContent);
    return upcoming[0].textContent;
  } else {
    return undefined;
  }
};

export default fetchRiderPhoto;
