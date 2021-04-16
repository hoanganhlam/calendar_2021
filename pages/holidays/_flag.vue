<template>
  <div class="flex flex-col md:flex-row md:space-x-4">
    <div class="flex-1 mb-4">
      <div class="content">
        <h1 class="text-2xl font-bold">
          {{ $t(`page.holidays.${isYear ? 'year' : 'month'}.title`, [`${$t(month_names[currentDate.getMonth()])} ${currentDate.getFullYear()}`]) }}</h1>
        <p class="text-lg">
          {{ $t(`page.holidays.${isYear ? 'year' : 'month'}.desc`, [`${$t(month_names[currentDate.getMonth()])} ${currentDate.getFullYear()}`]) }}</p>
      </div>
      <table class="my-3 min-w-max w-full table-auto">
        <thead>
        <tr class="bg-gray-200 border text-gray-600 uppercase text-sm leading-normal">
          <th class="py-2 px-4 text-left">{{ $t('date') }}</th>
          <th class="py-2 px-4 text-left"></th>
          <th class="py-2 px-4 text-center">{{ $t('holiday') }}</th>
          <th class="py-2 px-4 text-center">{{ $t('day_until') }}</th>
        </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
        <tr v-for="holiday in holidays" :key="holiday.id"
            class="border-b border-gray-200 hover:bg-gray-100 border-l border- ">
          <td class="py-2 px-4 text-left whitespace-nowrap">
            <div class="flex">
              <span class="font-bold">{{ holiday.dateName }}</span>
            </div>
          </td>
          <td class="py-2 px-4">
            <div class="flex items-center">{{ holiday.dateWeek }}</div>
          </td>
          <td class="py-2 px-4">
            <n-link :to="`/holiday/${holiday.slug}`">{{ holiday.name }}</n-link>
          </td>
          <td class="py-2 px-4 text-right">
            <span class="bg-gray-100 text-purple-600 py-1 px-3 rounded-full text-xs">{{ holiday.until }}</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-if="isYear" class="mb-3">
        <div class="py-2">
          <h4 class="text-2xl mb-2">{{ $t(`page.holidays.${isYear ? 'year.by_year': 'month.other_year'}`) }}</h4>
        </div>
        <ul class="list-disc">
          <li class="ml-6" v-for="i in 5" :key="i">
            <n-link :to="`/holidays/${currentDate.getFullYear() + i}`">{{ currentDate.getFullYear() + i }} holidays
            </n-link>
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <div class="py-2">
          <h4 class="text-2xl mb-2">{{ $t(`page.holidays.${isYear ? 'year.by_month': 'month.other_month'}`) }}</h4>
        </div>
        <ul class="list-disc">
          <li class="ml-6" v-for="i in 12" :key="i">
            <n-link :to="`/holidays/${month_names[i -1].replace('m.', '')}-${currentDate.getFullYear()}`">
              <span>{{ $t('page.holidays.month.title', [`${$t(month_names[i - 1])} ${currentDate.getFullYear()}`]) }}</span>
            </n-link>
          </li>
        </ul>
      </div>
      <div v-if="!isYear" class="mb-3">
        <div class="py-2">
          <h4 class="text-2xl mb-2">{{ $t(`page.holidays.${isYear ? 'year.by_year': 'month.other_year'}`) }}</h4>
        </div>
        <ul class="list-disc">
          <li class="ml-6" v-for="i in 5" :key="i">
            <n-link :to="`/holidays/${month_names[i -1].replace('m.', '')}-${currentDate.getFullYear() + i}`">
              <span>{{$t(month_names[currentDate.getMonth()])}} {{ currentDate.getFullYear() + i }} holidays</span>
            </n-link>
          </li>
        </ul>
      </div>
    </div>
    <sidebar/>
  </div>
</template>

<script>
import Sidebar from "~/components/Sidebar";
import moment from "moment";
import Holidays from "date-holidays"
const hd = new Holidays()

export default {
  name: "PageHoliday",
  components: {Sidebar},
  data() {
    return {
      holidays: [],
      currentDate: new Date(),
    }
  },
  async fetch() {
    hd.init('US')
    if (this.isYear) {
      let flag = this.$route.params.flag ? this.$route.params.flag : (new Date()).getFullYear()
      const holidays = hd.getHolidays(flag)
      this.currentDate = new Date(`${flag}-1-1`)
      this.holidays = holidays.map(x => {
        let date = moment(new Date(x.date))
        let until = date.diff(new Date(), "days")
        return {
          ...x,
          date: date,
          dateName: date.format('MMMM D'),
          dateWeek: date.format("dddd"),
          until: until > 0 ? until : this.$t('passed'),
          slug: this.slugify(x.name)
        }
      })
    } else if (this.$route.params.flag) {
      let arr = this.$route.params.flag.split("-")
      this.currentDate = new Date(`${arr[1]}-${arr[0]}-1`)
      let flag = this.currentDate.getFullYear()
      const holidays = hd.getHolidays(flag)
      this.holidays = holidays.filter(x => {
        return new Date(x.date).getMonth() === this.currentDate.getMonth()
      }).map(x => {
        let date = moment(new Date(x.date))
        let until = date.diff(new Date(), "days")
        return {
          ...x,
          date: date,
          dateName: date.format('MMMM D'),
          dateWeek: date.format("dddd"),
          until: until > 0 ? until : this.$t('passed'),
          slug: this.slugify(x.name)
        }
      })
    }
  },
  computed: {
    isYear() {
      return !Boolean(this.$route.params.flag) || this.$route.params.flag.length === 4
    }
  }
}
</script>

<style scoped>

</style>
