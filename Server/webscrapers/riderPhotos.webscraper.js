import got from "got";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const fetchRiderPhoto = async (names) => {
  const linkAndName = await names.map(async (name) => {
    const dom = await getDomElement(name);
    const link = await findImageLink(dom);
    return {image: link, rider: name.rider}
  });
  console.log('returning linkAndName')
  return linkAndName;
};

const getDomElement = async (name) => {
  const url = `https://www.procyclingstats.com/rider/${name.firstName}${name.lastNames}`;
  const data = await got(url);
  return data;
}

const findImageLink = async (response) => {
  const dom = new JSDOM(response.body);
  let photoLink = [...dom.window.document.querySelectorAll("body > div.wrapper > div.content > div.page-content.page-object.default > div:nth-child(2) > div.left.w75.mb_w100 > div.left.w50.mb_w100 > div.rdr-img-cont > a > img")];
  if (photoLink.length) {
    const image = photoLink[0];
    return image.src;
  } else {
    return undefined;
  }
}

export default fetchRiderPhoto;