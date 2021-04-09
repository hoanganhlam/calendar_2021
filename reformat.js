const fs = require("fs");

let rawdata = fs.readFileSync('./api/data/holiday_home.json');
let students = JSON.parse(rawdata);
const out = students.map(item => {
  console.log(item.ID);
  console.log(item.name);
  return {
    id: item.ID,
    name: item.name,
    date: item.y_2000.replace("2000-", "")
  }
})

fs.writeFile("./api/data/new_holiday_home.json", JSON.stringify(out), (err) => {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});
