import { fromPath } from "pdf2pic";

const bodyParser = require('body-parser')
const app = require('express')()
const home_raw = require("./data/new_holiday_home.json")
const holiday_raw = require("./data/new_holiday_list.json")
const {PDFCalendar} = require("./calendar")
const fs = require('fs');

const pdf_dir = './data/pdf';
const img_dir = './data/images';
if (!fs.existsSync(pdf_dir)) {
  fs.mkdirSync(pdf_dir);
}
if (!fs.existsSync(img_dir)) {
  fs.mkdirSync(img_dir);
}

app.use(bodyParser.json())

app.all('/home', (req, res) => {
  res.json(home_raw)
})

app.all('/holidays', (req, res) => {
  res.json(holiday_raw)
})

app.all('/maker', (req, res) => {
  const is_force = req.query.force === true || req.query.force === 'true'
  const is_preview = req.query.preview === true || req.query.preview === 'true'
  const {
    type,
    year,
    day_size,
    orientation,
    paper_size,
    weekend_shaded,
    grid_lines,
    grid_color,
    weekday_start,
    month_start
  } = req.query

  const filename = "temp"
  const pdf_path = `${pdf_dir}/${filename}.pdf`
  if (!fs.existsSync(pdf_path) || is_force) {
    const instance = new PDFCalendar({
      type,
      year,
      day_size,
      orientation,
      paper_size,
      weekend_shaded,
      grid_lines,
      grid_color,
      weekday_start,
      month_start
    })
    const doc = instance.draw()
    doc.pipe(fs.createWriteStream(pdf_path));
    const convert = fromPath(pdf_path, {
      saveFilename: filename,
      savePath: img_dir,
      format: "jpg",
    })
    convert(1).then(data => {
      if (is_preview) {
        const readStream = fs.createReadStream(data.path);
        readStream.pipe(res);
      } else {
        const readStream = fs.createReadStream(pdf_path);
        readStream.pipe(res);
      }
    })
    doc.end()
  } else {
    if (is_preview) {
      const readStream = fs.createReadStream(`${img_dir}/${filename}.1.jpg`);
      readStream.pipe(res);
    } else {
      const readStream = fs.createReadStream(pdf_path);
      readStream.pipe(res);
    }
  }
})

module.exports = app
