import Vue from 'vue'
import Icon from "~/components/Icon.vue";
import Noteable from "~/components/cell/Noteable.vue";

Vue.component('icon', Icon);
Vue.component('noteable', Noteable);

Vue.mixin({
  data() {
    return {
      month_names: [
        "m.january", "m.february", "m.march", "m.april", "m.may", "m.june",
        "m.july", "m.august", "m.september", "m.october", "m.november", "m.december"
      ]
    }
  },
  methods: {
    slugify(str) {
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();
      const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      const to = "aaaaeeeeiiiioooouuuunc------";
      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
      return str;
    }
  },
  computed: {
    week_days() {
      const days = ["w.sun", "w.mon", "w.tue", "w.wed", "w.thu", "w.fri", "w.sat", "w.sun"];
      return days.slice(this.$store.state.config.calendar.day_start_week, 8)
    },
  }
});

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
Date.prototype.addHours = function (hours) {
  let date = new Date(this.valueOf());
  date.setHours(date.getHours() + hours);
  return date;
}
Date.isLeapYear = function (year) {
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};
Date.getDaysInMonth = function (year, month) {
  return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
Date.prototype.isLeapYear = function () {
  return Date.isLeapYear(this.getFullYear());
};
Date.prototype.getDaysInMonth = function () {
  return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};
Date.prototype.addMonths = function (value) {
  let date = new Date(this.valueOf());
  let n = this.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + value);
  date.setDate(Math.min(n, date.getDaysInMonth()));
  return date;
};
Date.prototype.sameDate = function (right) {
  let date = new Date(this.valueOf());
  return right.getFullYear() === date.getFullYear() && right.getMonth() === date.getMonth() && right.getDate() === date.getDate();
};
Date.prototype.sameTime = function (right) {
  let date = new Date(this.valueOf());
  return right.getFullYear() === date.getFullYear() && right.getMonth() === date.getMonth() && right.getDate() === date.getDate() && right.getHours() === date.getHours();
}
Date.prototype.isLeapYear = function () {
  const year = this.getFullYear();
  if ((year & 3) !== 0) return false;
  return ((year % 100) !== 0 || (year % 400) === 0);
};
Date.prototype.getDOY = function () {
  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const mn = this.getMonth();
  const dn = this.getDate();
  let dayOfYear = dayCount[mn] + dn;
  if (mn > 1 && this.isLeapYear()) dayOfYear++;
  return dayOfYear;
};
Date.prototype.getWeekNumber = function () {
  let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  let dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};

Date.prototype.isToday = function () {
  const today = new Date()
  return this.getFullYear() === today.getFullYear() && this.getDOY() === today.getDOY()
}

Date.prototype.isWeekend = function () {
  return [0, 6].includes(this.getDay())
}
