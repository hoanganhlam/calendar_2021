<template>
  <div class="h-full">
    <div class="flex print:hidden justify-between">
      <div>
        <div class="flex -mx-2 items-center">
          <n-link
            class="mx-1.5 btn rounded shadow hover:bg-gray-100" :to="moveDate(0)"
            :class="{'bg-gray-100': isToday(), 'shadow-inner': isToday()}"
          >Today
          </n-link>
          <div class="mx-1.5 border rounded shadow">
            <div class="flex">
              <n-link class="cursor-pointer hover:bg-gray-100 hover:shadow-inner" :to="moveDate(-1)">
                <icon class="p-1.5 md" name="left"></icon>
              </n-link>
              <div v-if="isHome || (isMonth && $route.params.flag !== 'monthly')"
                   class="px-1.5 cursor-pointer flex space-x-2 items-center hover:bg-gray-100 hover:shadow-inner"
                   @click="showModal = true">
                <icon name="calendar"></icon>
                <span class="hidden md:block">{{ dateLocalize }}</span>
              </div>
              <div v-else class="bg-gray-100 shadow-inner p-1.5">
                <span>{{ dateLocalize }}</span>
              </div>
              <n-link class="cursor-pointer hover:bg-gray-100 hover:shadow-inner" :to="moveDate(1)">
                <icon class="p-1.5 md" name="right"></icon>
              </n-link>
            </div>
          </div>
          <div v-if="!isDay" class="mx-1.5 btn shadow rounded hover:bg-gray-100"
               :class="{'bg-gray-100': showOption, 'shadow-inner': showOption}"
               @click="showOption = !showOption">
            <icon name="app"></icon>
          </div>
        </div>
      </div>
      <div class="flex -mx-1.5">
        <div v-show="false" class="mx-1.5 btn rounded hover:bg-gray-100 hover:shadow-inner">
          <icon name="save"></icon>
          <span class="hidden md:block">{{ $t('save') }}</span>
        </div>
        <div class="mx-1.5 btn rounded hover:bg-gray-100 hover:shadow-inner">
          <icon name="download"></icon>
          <span class="hidden md:block">{{ $t('download') }}</span>
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
    <div class="my-6 print:my-0 print:flex flex-col print:my-0" :class="{'print:h-full': $route.params.flag !== 'monthly'}">
      <h1 class="text-2xl text-center pb-4 hidden print:pb-0" :class="{'print:block': $route.params.flag !== 'monthly'}">
        <span>{{ dateLocalize }}</span>
      </h1>
      <div v-if="$route.params.flag === 'monthly'">
        <div v-for="i in 12" :key="i" class="pb-6 print:flex flex-col print:h-screen overflow-hidden">
          <h2 class="text-2xl pb-4">
            <n-link :to="`/month/${month_names[i - 1].replace('m.', '')}-${initDate.getFullYear()}`">
              <span>{{ $t(month_names[i-1]) }} {{initDate.getFullYear()}}</span>
            </n-link>
          </h2>
          <board-month class="print:flex-1 print:pb-4" :date="new Date(initDate.getFullYear(), i - 1, 1)"/>
          <div class="hidden print:block text-sm">Copyright © CalendarZones.com</div>
        </div>
      </div>
      <div v-else class="flex-1 flex flex-col print:py-4">
        <board-year :date="initDate" v-if="isYear"/>
        <board-week :date="initDate" v-else-if="isWeek || isDay"/>
        <board-month v-else class="print:flex-1" :date="initDate"/>
      </div>
      <div v-if="isYear && options.showHoliday" class="py-6 print:py-0">
        <h4 class="uppercase mb-2 text-gray-500 text-sm">{{ $t('holidays') }}</h4>
        <div class="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-1 border p-3 mb-2">
          <div v-for="(h, i) in holidays" :key="i" class="">
            <div class="flex -mx-1">
              <div class="mx-1 w-1/3 print:text-xs text-sm font-bold text-green-600">{{ parseMDate(h.date) }}</div>
              <n-link to="/" class="flex-1 print:text-xs text-sm">{{ h.name }}</n-link>
            </div>
          </div>
        </div>
        <n-link class="text-sm print:hidden" :to="`/holidays/${initDate.getFullYear()}`">
          <span>{{ $t('home.more_holiday') }} {{ initDate.getFullYear() }}</span>
        </n-link>
      </div>
      <div v-if="$route.params.flag !== 'monthly'" class="hidden print:block text-sm">
        Copyright © CalendarZones.com
      </div>
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
              <div class="cursor-pointer font-bold px-2 flex-1" v-for="i in 5" :key="i"
                   :class="{'text-gray-400': popMonth.y === initDate.getFullYear() + i - 3}"
                   @click="selectDate('y', initDate.getFullYear() + i - 3)">
                <div>{{ initDate.getFullYear() + i - 3 }}</div>
              </div>
            </div>
            <template v-if="$route.params.flag === 'month' || isHome">
              <h4 class="mb-1 font-bold text-sm">{{ $t('month') }}</h4>
              <div class="mb-4 grid grid-cols-3">
                <div class="cursor-pointer" :class="{'text-gray-400': popMonth.m === i - 1}"
                     v-for="i in 12" :key="i" @click="selectDate('m', i - 1)">
                  <div>{{ $t(month_names[i - 1]) }}</div>
                </div>
              </div>
              <h4 class="mb-1 font-bold text-sm">{{ $t('modal.quick_nav') }}</h4>
              <div class="flex -mx-2">
                <div class="flex-1 px-2">
                  <n-link class="btn justify-center hover:bg-gray-50" :to="moveDate(-1)">{{ $t('nav.previous_month') }}</n-link>
                </div>
                <div class="flex-1 px-2">
                  <n-link class="btn justify-center hover:bg-gray-50" :to="moveDate(0)">{{ $t('nav.current_month') }}</n-link>
                </div>
                <div class="flex-1 px-2">
                  <n-link class="btn justify-center hover:bg-gray-50" :to="moveDate(1)">{{ $t('nav.next_month') }}</n-link>
                </div>
              </div>
            </template>
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
const RESULTS = require("@/data/holiday_year.json")
export default {
  name: "PageDate",
  components: {BoardWeek, BoardYear, BoardMonth},
  data() {
    return {
      showOption: false,
      options: {
        showHoliday: false,
        showGridLine: false,
        shadedWeekend: false,
        sundayStart: false
      },
      showModal: false,
      holidays: [],
      popMonth: {
        y: 2021,
        m: 0
      }
    }
  },
  async fetch() {
    this.holidays = RESULTS
    this.convertOption(false)
  },
  methods: {
    isToday() {
      const current = new Date()
      let path = null
      if (this.isYear) {
        path = `/year/${current.getFullYear()}`
      } else if (this.isMonth || this.isHome) {
        if (this.$route.params.flag === 'monthly') {
          path = `/monthly/${current.getFullYear()}`
        } else {
          path = `/month/${this.month_names[current.getMonth()].replace("m.", "")}-${current.getFullYear()}`
        }
      } else if (this.isWeek) {
        path = `/week/${current.getWeekNumber()}-${current.getFullYear()}`
      } else if (this.isDay) {
        path = `/day/${current.getDOY()}-${current.getFullYear()}`
      }
      return this.isHome || path === this.$route.path
    },
    moveDate(amount) {
      if (amount === 0) {
        const current = new Date()
        if (this.isYear) {
          return `/year/${current.getFullYear()}`
        } else if (this.isMonth || this.isHome) {
          if (this.$route.params.flag === 'monthly') {
            return `/monthly/${current.getFullYear()}`
          } else {
            return `/month/${this.month_names[current.getMonth()].replace("m.", "")}-${current.getFullYear()}`
          }
        } else if (this.isWeek) {
          return `/week/${current.getWeekNumber()}-${current.getFullYear()}`
        } else if (this.isDay) {
          return `/day/${current.getDOY()}-${current.getFullYear()}`
        }
      } else {
        let cloneDate = new Date(this.initDate.getTime())
        if (this.isHome || this.isMonth) {
          if (this.$route.params.flag === 'monthly') {
            cloneDate = cloneDate.addMonths(amount * 12)
            return `/monthly/${cloneDate.getFullYear()}`
          } else {
            cloneDate = cloneDate.addMonths(amount)
            return `/month/${this.month_names[cloneDate.getMonth()].replace("m.", "")}-${cloneDate.getFullYear()}`
          }
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
      if (flag === 'y') {
        if (this.$route.params.flag === 'monthly') {
          this.$router.push(`/monthly/${value}`)
        } else {
          this.popMonth.y = value
        }
      } else if (flag === 'm') {
        this.$router.push(`/month/${this.month_names[value].replace("m.","")}-${this.popMonth.y}`)
      }
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
    dateLocalize() {
      if (this.isHome || this.isMonth) {
        if (this.$route.params.flag === 'monthly') {
          return this.$t('page.calendar.title.monthly', [this.initDate.getFullYear()])
        } else {
          return this.$t('page.calendar.title.month', [this.$t(this.month_names[this.initDate.getMonth()]), this.initDate.getFullYear()])
        }
      } else if (this.isWeek) {
        return `${this.$t('week')} ${this.initDate.getWeekNumber()} / ${this.initDate.getFullYear()}`
      } else if (this.isDay) {
        return this.$t(this.month_names[this.initDate.getMonth()]) + " " + this.initDate.getDate() + ", " + this.initDate.getFullYear()
      } else if (this.isYear) {
        return this.$t('page.calendar.title.year', [this.initDate.getFullYear()])
      }
    },
  },
  watch: {
    options: {
      deep: true,
      handler: function () {
        this.convertOption(true)
      }
    }
  },
  mounted() {
    this.popMonth = {
      y: this.initDate.getFullYear(),
      m: this.initDate.getMonth()
    }
    if (localStorage.getItem("calendar")) {
      this.$store.commit('note/SET_NOTES', JSON.parse(localStorage.getItem("calendar")))
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

@media print {
  .container {
    max-width: 100%;
  }
}
</style>
