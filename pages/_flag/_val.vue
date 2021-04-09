<template>
  <div class="h-full">
    <div class="flex print:hidden justify-between">
      <div>
        <div class="flex -mx-2 items-center">
          <n-link
            class="mx-1.5 btn rounded shadow hover:bg-gray-100" :to="moveDate(0)"
            :class="{'bg-gray-100': isHome || initDate.isToday(), 'shadow-inner': isHome || initDate.isToday()}"
          >Today
          </n-link>
          <div class="mx-1.5 border rounded shadow">
            <div class="flex space-x-1.5">
              <n-link class="cursor-pointer hover:bg-gray-100 hover:shadow-inner" :to="moveDate(-1)">
                <icon class="p-1.5 md" name="left"></icon>
              </n-link>
              <n-link class="cursor-pointer hover:bg-gray-100 hover:shadow-inner" :to="moveDate(1)">
                <icon class="p-1.5 md" name="right"></icon>
              </n-link>
            </div>
          </div>
          <div v-if="isHome || isMonth" class="mx-1.5 btn shadow rounded hover:bg-gray-100" @click="showModal = true">
            <icon name="calendar"></icon>
            <span class="hidden md:block">{{ dateLocalize }}</span>
          </div>
          <div class="mx-1.5 btn shadow rounded hover:bg-gray-100"
               :class="{'bg-gray-100': showOption, 'shadow-inner': showOption}"
               @click="showOption = !showOption">
            <icon name="app"></icon>
          </div>
          <div v-if="!(isHome || isMonth)" class="mx-3">
            <span>{{ dateLocalize }}</span>
          </div>
        </div>
      </div>
      <div class="flex -mx-1.5">
        <div class="mx-1.5 btn rounded hover:bg-gray-100 hover:shadow-inner">
          <icon name="save"></icon>
          <span class="hidden md:block">{{ $t('save') }}</span>
        </div>
        <div @click="print" class="mx-1.5 btn rounded text-white bg-red-400 hover:bg-red-500 hover:shadow-inner">
          <icon name="print" fill="#EEE"></icon>
          <span class="hidden md:block">{{ $t('print') }}</span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showOption" class="my-4 p-4 bg-gray-50 border print:hidden">
        <div class="grid grid-cols-2 gap-4">
          <div v-for="key in Object.keys(options)" :key="key" class="flex space-x-4">
            <label class="inline-flex items-center cursor-pointer">
              <input v-model="options[key]" type="checkbox" class="h-6 w-6"/>
            </label>
            <div>
              <h4 class="font-bold text-sm leading-none">{{ $t(`options.${key}.title`) }}</h4>
              <p class="text-xs text-gray-700">{{ $t(`options.${key}.desc`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="my-6 print:flex flex-col print:my-0 print:mb-4" :class="{'print:h-full': !isYear}">
      <h1 v-if="!(isHome || isMonth) || !options.show12Month" class="text-2xl text-center pb-4 hidden print:block print:pt-4">{{ dateLocalize }}</h1>
      <board-year :date="initDate" v-if="isYear"/>
      <board-week :date="initDate" v-else-if="isWeek || isDay" :is-day="isDay"/>
      <template v-else-if="!options.show12Month">
        <board-month class="print:flex-1 print:pb-4" v-if="!options.show12Month" :date="initDate"/>
      </template>
      <div v-else-if="options.show12Month">
        <div class="print:h-screen print:mb-0 mb-4 print:flex flex-col" v-for="i in 12" :key="i">
          <h2 v-if="!isMonth" class="text-2xl pb-4 print:pt-4">{{ $t(month_names[i-1]) }} {{initDate.getFullYear()}}</h2>
          <board-month class="print:flex-1 print:pb-4" :date="new Date(initDate.getFullYear(), i - 1, 1)"/>
        </div>
      </div>
    </div>
    <div v-if="isYear" class="my-6 print:my-0">
      <h4 class="uppercase mb-2 text-gray-500 text-sm">{{ $t('holidays') }}</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-1 border p-3 mb-2">
        <div v-for="(h, i) in holidays" :key="i" class="">
          <div class="flex -mx-1">
            <div class="mx-1 w-1/3 print:text-xs text-sm font-bold text-green-600">{{ parseMDate(h.date) }}</div>
            <n-link to="/" class="flex-1 print:text-xs text-sm">{{ h.name }}</n-link>
          </div>
        </div>
      </div>
      <n-link class="text-sm print:hidden" :to="`/holidays/${initDate.getFullYear()}`">{{ $t('home.more_holiday') }}
        {{ initDate.getFullYear() }}
      </n-link>
    </div>
    <div class="my-6 print:hidden">
      <h4 class="uppercase mb-2 text-gray-500 text-sm">{{ $t('app.title') }}</h4>
      <div class="mb-2">
        <div class="flex space-x-2">
          <icon name="plus" fill="red"></icon>
          <n-link :to="`/year/${initDate.getFullYear()}`" class="font-bold">{{ $t('app.calendar_year.title') }}</n-link>
        </div>
        <p>{{ $t('app.calendar_year.desc') }}</p>
      </div>
      <div class="mb-2">
        <div class="flex space-x-2">
          <icon name="plus" fill="red"></icon>
          <n-link :to="`/week/${initDate.getWeekNumber()}-${initDate.getFullYear()}`" class="font-bold">
            {{ $t('app.calendar_week.title') }}
          </n-link>
        </div>
        <p>{{ $t('app.calendar_week.desc') }}</p>
      </div>
      <div class="mb-2">
        <div class="flex space-x-2">
          <icon name="plus" fill="red"></icon>
          <n-link :to="`/day/${initDate.getDOY()}-${initDate.getFullYear()}`" class="font-bold">
            {{ $t('app.calendar_day.title') }}
          </n-link>
        </div>
        <p>{{ $t('app.calendar_day.desc') }}</p>
      </div>
    </div>
    <transition nade="fade">
      <div v-show="showModal" class="modal">
        <div class="mx-auto w-full md:w-1/3 md:mt-16 flex flex-col justify-end md:justify-start h-full">
          <div class="mb-2 flex justify-end">
            <div class="cursor-pointer ml-auto rounded-full bg-gray-50 shadow p-2.5 inline-flex"
                 @click="showModal = !showModal">
              <icon name="close"></icon>
            </div>
          </div>
          <div class="modal-content">
            <h3 class="mb-2 font-bold uppercase">{{ $t('modal.title') }}</h3>
            <p class="mb-2 text-gray-500">{{ $t('modal.desc') }}</p>
            <h4 class="mb-1 font-bold text-sm">{{ $t('year') }}</h4>
            <div class="mb-4 flex -mx-2">
              <div class="px-2 flex-1" v-for="i in 5" :key="i">
                <n-link :to="selectDate('y', initDate.getFullYear() + i - 3)">{{ initDate.getFullYear() + i - 3 }}
                </n-link>
              </div>
            </div>
            <h4 class="mb-1 font-bold text-sm">{{ $t('month') }}</h4>
            <div class="mb-4 grid grid-cols-3">
              <div v-for="i in 12" :key="i">
                <n-link :to="selectDate('m', i - 1)">{{ $t(month_names[i - 1]) }}</n-link>
              </div>
            </div>
            <h4 class="mb-1 font-bold text-sm">{{ $t('modal.quick_nav') }}</h4>
            <div class="flex -mx-2 text-center">
              <div class="flex-1 px-2">
                <n-link class="btn hover:bg-gray-50" :to="moveDate(-1)">{{ $t('nav.previous_month') }}</n-link>
              </div>
              <div class="flex-1 px-2">
                <n-link class="btn hover:bg-gray-50" :to="moveDate(1)">{{ $t('nav.next_month') }}</n-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BoardMonth from "~/components/board/Month.vue";
import BoardYear from "~/components/board/Year.vue";
import BoardWeek from "~/components/board/Week.vue";
import {cloneDeep} from "lodash";

export default {
  name: "PageDate",
  components: {BoardWeek, BoardYear, BoardMonth},
  data() {
    return {
      showOption: false,
      options: {
        showHoliday: false,
        show12Month: false,
        shadedWeekend: false,
        sundayStart: false
      },
      showModal: false,
      holidays: []
    }
  },
  async fetch() {
    this.holidays = await this.$axios.$get("/home")
    this.convertOption(false)
  },
  methods: {
    moveDate(amount) {
      if (amount === 0) {
        return '/'
      } else {
        let cloneDate = new Date(this.initDate.getTime())
        if (this.isHome || this.isMonth) {
          cloneDate = cloneDate.addMonths(amount)
          return `/month/${this.month_names[cloneDate.getMonth()].replace("m.", "")}-${cloneDate.getFullYear()}`
        } else if (this.isYear) {
          cloneDate = cloneDate.addMonths(amount * 12)
          return `/year/${cloneDate.getFullYear()}`
        } else if (this.isWeek) {
          cloneDate = cloneDate.addDays(amount * 7)
          return `/week/${cloneDate.getWeekNumber()}-${cloneDate.getFullYear()}`
        } else if (this.isDay) {
          cloneDate = cloneDate.addDays(amount)
          return `/day/${cloneDate.getDOY()}-${cloneDate.getFullYear()}`
        }
      }
    },
    selectDate(flag, value) {
      let cloneDate = new Date(this.initDate.getTime())
      if (flag === 'y') {
        cloneDate.setFullYear(value)
      } else if (flag === 'm') {
        cloneDate.setMonth(value)
      }
      return '/month/' + this.month_names[cloneDate.getMonth()].replace("m.", "") + "-" + cloneDate.getFullYear()
    },
    parseMDate(date) {
      const d = new Date(`2000-${date}`)
      return this.$t(this.month_names[d.getMonth()]).substr(0, 3) + ' - ' + d.getDate()
    },
    print() {
      setTimeout(() => {
        window.print();
      }, 300)
    },
    convertOption(reverse = false) {
      let origin = cloneDeep(this.$store.state.config.calendar)
      if (reverse) {
        Object.keys(origin).forEach(key => {
          origin[key] = this.options[key]
        })
        origin.day_start_week = this.options.sundayStart ? 0 : 1;
        this.$store.commit('config/SET_CONFIG_CALENDAR', origin)
      } else {
        Object.keys(this.options).forEach(key => {
          if (typeof origin[key] !== 'undefined') {
            this.options[key] = origin[key]
          }
        })
        this.options.sundayStart = !Boolean(this.options.sundayStart)
      }
    }
  },
  computed: {
    isHome() {
      return this.$route.path === '/'
    },
    isMonth() {
      return this.$route.params.flag === 'month'
    },
    isYear() {
      return this.$route.params.flag === 'year'
    },
    isDay() {
      return this.$route.params.flag === 'day'
    },
    isWeek() {
      return this.$route.params.flag === 'week'
    },
    navigate() {
      let n, p, flag;
      if (this.isHome || this.isMonth) {
        flag = 'month'
        p = this.initDate.addMonths(-1)
        n = this.initDate.addMonths(1)
      } else if (this.isYear) {
        flag = 'year'
        p = this.initDate.addMonths(-12)
        n = this.initDate.addMonths(12)
      } else if (this.isWeek) {
        flag = 'week'
        p = this.initDate.addDays(-7)
        n = this.initDate.addDays(7)
      } else if (this.isDay) {
        flag = 'day'
        p = this.initDate.addDays(-1)
        n = this.initDate.addDays(1)
      }

      function toSlug(d, f) {
        switch (f) {
          case 'day':
            break
        }
      }

      if (flag) {
        return {}
      } else {
        return null
      }
    },
    dateLocalize() {
      if (this.isHome || this.isMonth) {
        return this.$t(this.month_names[this.initDate.getMonth()]) + " " + this.initDate.getFullYear()
      } else if (this.isWeek) {
        return `${this.$t('week')} ${this.initDate.getWeekNumber()}`
      } else if (this.isDay) {
        return this.$t(this.month_names[this.initDate.getMonth()]) + " " + this.initDate.getDate()
      } else if (this.isYear) {
        return this.initDate.getFullYear()
      }
    },
    initDate() {
      if (this.isHome) {
        return new Date()
      } else {
        const {flag, val} = this.$route.params;
        let arr = val.split("-");
        let start_date = new Date(Number.parseInt(arr[flag === 'year' ? 0 : 1]), 0, flag === 'day' ? 0 : 1, 0, 0)
        if (this.isMonth) {
          start_date = start_date.addMonths(this.month_names.indexOf(`m.${arr[0]}`))
        } else if (this.isWeek) {
          start_date = start_date.addDays(Number.parseInt(arr[0]) * 7 - 4)
        } else if (this.isDay) {
          start_date = start_date.addDays(Number.parseInt(arr[0]));
        }
        return start_date
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler: function () {
        this.convertOption(true)
      }
    }
  }
}
</script>
<style>
.modal {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(79, 75, 75, 0.3);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(7.5px);
  z-index: 999;
  height: 100vh;
  overflow: hidden;
}

.modal-content {
  @apply bg-white rounded p-6 pb-24 md:pb-6 shadow-lg md:border border-gray-300;
}
</style>
