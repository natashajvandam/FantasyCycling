import got from "got";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

//const url = `https://www.procyclingstats.com/rider/${firstName}-${lastNames}`;
const fetchRiderPhoto = async (url) => {
  const data = await got(url).then((response) => {
    const dom = new JSDOM(response.body);
    let photoLink = [...dom.window.document.querySelectorAll("body > div.wrapper > div.content > div.page-content.page-object.default > div:nth-child(2) > div.left.w75.mb_w100 > div.left.w50.mb_w100 > div.rdr-img-cont > a > img")];
    if (photoLink.length) {
      const image = photoLink[0]
      console.log(image.src);
      return image.src;
    } else {
      console.log('no photo');
      return 'no photo';
    }
  }).catch(error => console.log(error));
  return data;
};

const getFirstAndLastName = (data) => {
  const names = data.map(rider => {
    const nameArray = rider.name.split(' ');
    const firstName = nameArray.pop();
    const lastNames = nameArray.join('-');
    return {firstName, lastNames};
  })
  console.log(names);
  names.forEach(name => {
    fetchRiderPhoto(`https://www.procyclingstats.com/rider/${name.firstName}${name.lastNames}`)
  })
}


export default getFirstAndLastName;