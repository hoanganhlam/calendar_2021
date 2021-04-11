<template>
  <div v-if="holiday" class="flex flex-col md:flex-row md:space-x-4">
    <div class="flex-1 mb-4">
      <div class="content">
        <h1 class="text-4xl font-bold">{{ holiday.name }}</h1>
        <p class="text-xl">{{ $t('page.holiday.date', [holiday.dateWeek, holiday.dateName, holiday.year]) }}</p>
        <p>{{$t('page.holiday.desc', [holiday.name])}}</p>
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
        <tr v-for="holiday in instances" :key="holiday.id"
            class="border-b border-gray-200 hover:bg-gray-100 border-l border-r ">
          <td class="py-2 px-4 text-left whitespace-nowrap">
            <div class="flex">
              <span class="font-bold">{{ holiday.dateName }}</span>
            </div>
          </td>
          <td class="py-2 px-4">
            <div class="flex items-center">{{ holiday.dateWeek }}</div>
          </td>
          <td class="py-2 px-4">
            <n-link :to="`/holiday/${holiday.slug}`">{{ holiday.name }} {{holiday.year}}</n-link>
          </td>
          <td class="py-2 px-4 text-right">
            <span class="bg-gray-100 text-purple-600 py-1 px-3 rounded-full text-xs">{{ holiday.until }}</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="mb-3">
        <div class="py-2">
          <h4 class="text-2xl mb-2">{{ $t(`page.holiday.by_year`) }}</h4>
        </div>
        <ul class="list-disc">
          <li class="ml-6" v-for="i in 5" :key="i">
            <n-link :to="`/holidays/${date.getFullYear() + i}`">{{ date.getFullYear() + i }} holidays
            </n-link>
          </li>
        </ul>
      </div>
    </div>
    <sidebar/>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import moment from "moment";

const HOLIDAY_LIST = require("@/data/holiday_list.json")

export default {
  name: "Holiday",
  components: {Sidebar},
  data() {
    let test = HOLIDAY_LIST.filter(x => this.slugify(x.name) === this.$route.params.slug)
    let holiday = null
    let instances = []
    let date = new Date()
    if (test.length) {
      holiday = test[0]
      for (let i = 0; i < 10; i++) {
        let nextDate = moment(new Date(`${date.getFullYear() + i}-${holiday.date}`))
        let until = nextDate.diff(new Date(), "days")
        instances.push({
          ...holiday,
          date: nextDate,
          dateName: nextDate.format('MMMM D'),
          dateWeek: nextDate.format("dddd"),
          year: nextDate.year(),
          until: until > 0 ? until : this.$t('passed'),
          slug: this.slugify(holiday.name)
        })
      }
      holiday = instances[0]
    }
    return {
      holiday,
      date,
      instances
    }
  }
}
</script>

<style scoped>

</style>
