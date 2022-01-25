import got, { Response } from "got";
import jsdom from "jsdom";
import { Name } from "types/names";

const { JSDOM } = jsdom;

const getDomElement = async (name: Name) => {
  const url = `https://www.procyclingstats.com/rider/${name.firstName}${name.lastNames}`;
  const data = await got(url);
  return data;
};

const findImageLink = async (response: Response<string>) => {
  const dom = new JSDOM(response.body);
  const photoLink = [
    ...dom.window.document.querySelectorAll(
      "body > div.wrapper > div.content > div.page-content.page-object.default > div:nth-child(2) > div.left.w75.mb_w100 > div.left.w50.mb_w100 > div.rdr-img-cont > a > img"
    ),
  ] as HTMLImageElement[];
  if (photoLink.length) {
    const image = photoLink[0];
    return image.src;
  }
  return undefined;
};

const findPoints = async (response: Response<string>) => {
  const dom = new JSDOM(response.body);
  const points = [...dom.window.document.getElementsByClassName("pnt")];
  const pointsArray = [];
  for (let i = 0; i < points.length; i += 1) {
    pointsArray.push(points[i].textContent);
  }
  return pointsArray;
};

const findUpComing = async (response: Response<string>) => {
  const dom = new JSDOM(response.body);
  const upcoming = [...dom.window.document.getElementsByClassName("ellipsis")];
  if (upcoming.length) {
    return upcoming[0].textContent;
  }
  return undefined;
};

const fetchRiderPhoto = async (names: Name[]) => {
  const linkAndName = names.map(async (name) => {
    try {
      const dom = await getDomElement(name);
      const link = (await findImageLink(dom)) as string;
      const pnts = (await findPoints(dom)) as string[];
      const nextRace = (await findUpComing(dom)) as string;
      return { image: link, rider: name.rider, pnts, nextRace };
    } catch (error) {
      throw new Error("error fetching riderPhoto");
      // return { image: link, rider: name.rider, pnts, nextRace };
    }
  });
  const loadedimages = await Promise.all(linkAndName);
  return loadedimages;
};

export default fetchRiderPhoto;
