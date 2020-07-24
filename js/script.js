$(function() {
  getGSpreadSheet();
});

async function getGSpreadSheet() {
  await getData().then(response => {
    var items = response;
    var ulObj = $("#demo");
    var len = items.data.length;

    ulObj.append()

    for(var i = 0; i < len; i++) {
      ulObj.append("<tr><td>"+items.data[i].name+"</td><td>"+items.data[i].zokugara+"</td><td>"+items.data[i].age+"</td></tr>");
  }
  });
}

function getData() {
  return axios.get(`https://spreadsheets.google.com/feeds/list/1lA2nQTfqOW4Z5hkvPz-UPPUPkU9vJh9p3scva3ead4g/1/public/values?alt=json`)
  .then((res) => {
    const items = []
    const values = Object.values(res.data.feed.entry)
    values.forEach((value) => {
      const item = {
        name: value.gsx$名前.$t,
        zokugara: value.gsx$続柄.$t,
        age: value.gsx$年齢.$t
      }
      items.push(item)
    });
    const links = {
      data: items
    }
    return links;
  })
  .catch(e => ({ error: e }));
}