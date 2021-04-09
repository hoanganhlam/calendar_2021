const config = require('config');
const _ = require('lodash');
const PDFDocument = require('pdfkit');
const {createMonth} = require('./helpers/month');
const {createPage} = require('./helpers/page');

const {
  spacing,
  calendarsPerPage,
  size,
  margin,
  weekdays,
  borderColor,
  fontColor,
  holidayColor,
  inactiveColor,
  weekdayTitleSize,
  dayTitleSize,
  holidayTitleSize,
  holidayCharsPerLine,
  holidayLineHeight,
  monthTitleSize,
  yearTitleSize,
  weekdayColor,
  backgroundColor,
  dayFillColor,
  lineWidth
} = config.get('layout');
const holidays = {}

export class PDFCalendar {
  constructor({
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
              }) {
    this.pages = _
      .chain([
        {
          "year": 2021,
          "months": [1]
        }
      ])
      .map(({year, months}) => _
        .chain(months)
        .map((month) => createMonth(year, month - 1))
        .chunk(calendarsPerPage)
        .map((months) => createPage(months, holidays))
        .value())
      .flatten()
      .value();
    this.weekdaysHeight = weekdays.show ? weekdays.height : 0;
    this.maxRows = _.chain(this.pages).map('rows.length').max().value();
    this.rowHeight = (size[1] - 2 * margin - this.weekdaysHeight) / this.maxRows;
    this.colWidth = (size[0] - 2 * margin) / 7;
    this.doc = new PDFDocument({
      autoFirstPage: false,
      size,
      margin
    });
    this.doc.font('./api/fonts/Quicksand-Regular.ttf');
  }

  getRect(row, col) {
    return {
      x: col * this.colWidth + margin,
      y: row * this.rowHeight + margin + this.weekdaysHeight + monthTitleSize + 2 * spacing,
      width: this.colWidth,
      height: this.rowHeight
    }
  }

  drawRect(doc, x, y, width, height) {
    doc
      .rect(x, y, width, height)
      .lineWidth(lineWidth)
      .strokeColor(borderColor)
      .stroke();
    doc
      .rect(x, y, width, height)
      .fillColor(dayFillColor)
      .fill();
  };

  drawWeekdayTitle(doc, x, y, width, title) {
    doc
      .fontSize(weekdayTitleSize)
      .fillColor(weekdayColor)
      .text(title, x, y, {
        width,
        align: 'center'
      });
  };

  drawDayTitle(doc, x, y, title, isActive, isHoliday) {
    doc
      .fillColor(isActive
        ? isHoliday
          ? holidayColor
          : fontColor
        : inactiveColor)
      .fontSize(dayTitleSize)
      .text(title, x, y);
  };

  drawHoliday(doc, x, y, width, title) {
    doc
      .fillColor(fontColor)
      .fontSize(holidayTitleSize)
      .text(title, x, y, {
        width,
        align: 'right'
      });
  };

  drawMonth(doc, x, y, width, title) {
    doc
      .fillColor(fontColor)
      .fontSize(monthTitleSize)
      .text(title, x, y, {
        width,
        align: 'left'
      });
  };

  drawYear(doc, x, y, width, title) {
    doc
      .fillColor(fontColor)
      .fontSize(yearTitleSize)
      .text(title, x, y, {
        width,
        align: 'right'
      });
  };

  drawCell(row, col, {date, isActive, day, month, year, holiday, isHoliday}) {
    const {x, y, width, height} = this.getRect(row, col);
    this.drawRect(this.doc, x, y, width, height);

    if (!isActive) {
      return;
    }
    this.drawDayTitle(this.doc, x + 2, y - 3, day, isActive, isHoliday);
    if (holiday) {
      this.drawHoliday(this.doc, x + 2, y + this.rowHeight - Math.ceil(holiday.length / holidayCharsPerLine) * holidayLineHeight, width - 4, holiday);
    }
  };

  draw() {
    this.pages.forEach((page, i) => {
      this.doc.addPage();
      this.doc
        .fillColor(backgroundColor)
        .rect(0, 0, size[0], size[1])
        .fill();
      this.drawMonth(this.doc, margin, margin, 50, "AAA")
      if (weekdays.show) {
        weekdays.titles.forEach((title, i) => {
          const x = margin + i * this.colWidth;
          this.drawWeekdayTitle(this.doc, x, margin + monthTitleSize + spacing, this.colWidth, title);
        });
      }

      page.rows.forEach((cols, row) =>
        cols.forEach((cell, col) => this.drawCell(row, col, cell))
      );
    });
    return this.doc
  }
}
