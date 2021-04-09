<template>
  <div class="w-full">
    <div class="grid border border-b-0 border-r-0" :class="{'grid-cols-7': !isDay}">
      <board-day class="border-r" v-for="(d, i) in date_arr" :key="i" :date="d" :limit="limit"/>
    </div>
    <div class="flex space-x-3 print:hidden">
      <div class="px-4 py-1.5 border space-x-2 inline-flex mt-4 cursor-pointer hover:bg-gray-50 hover:shadow-inner" @click="limit++">
        <icon name="plus"></icon>
        <span>{{$t('add_row')}}</span>
      </div>
      <div v-if="limit" class="px-4 py-1.5 border space-x-2 inline-flex mt-4 cursor-pointer hover:bg-gray-50 hover:shadow-inner" @click="limit--">
        <icon name="minus"></icon>
        <span>{{$t('remove_row')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BoardDay from "@/components/board/Day.vue";

export default {
  name: "BoardWeek",
  components: {BoardDay},
  props: {
    isDay: {
      default: false,
      type: Boolean
    },
    date: {
      default: () => {
        return new Date()
      },
      type: Date
    }
  },
  data() {
    return {
      date_arr: [],
      limit: 4
    }
  },
  methods: {
    init() {
      if (this.isDay) {
        this.date_arr = [this.date]
      } else {
        let date_arr = []
        let start_date = this.date
        let distance = this.$store.state.config.calendar.day_start_week - start_date.getDay()
        start_date = start_date.addDays(distance <= 0 ? distance : distance - 7);
        for (let i = 0; i < 7; i++) {
          date_arr.push(start_date.addDays(i))
        }
        this.date_arr = date_arr;
      }
    }
  },
  created() {
    this.init()
  },
  watch: {
    date() {
      this.init()
    }
  }
}
</script>

<style scoped>

</style>
