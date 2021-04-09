<template>
  <div class="print:flex flex-col" v-if="date">
    <div class="grid grid-cols-7 mb-2 text-sm capitalize">
      <div v-for="i in 7" :key="i" class="">{{ $t(week_days[i - 1]) }}</div>
    </div>
    <div class="print:flex-1 grid grid-cols-7 border-t border-l text-xs">
      <div v-for="(d, i) in date_arr" :key="i" class="border-r border-b relative" :class="{'bg-gray-50': d.isWeekend() && shaded}">
        <noteable/>
        <span v-if="d.getMonth() === date.getMonth()"
              class="absolute bottom-2 right-2" :class="{'today': d.isToday()}">{{ d.getDate() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardMonth",
  props: {
    date: {
      default: () => new Date(),
      type: Date
    }
  },
  data() {
    return {
      start_date: null,
      date_arr: []
    }
  },
  methods: {
    init() {
      let date_arr = []
      let start_date = new Date(this.date.getFullYear(), this.date.getMonth())
      let distance = this.$store.state.config.calendar.day_start_week - start_date.getDay()
      start_date = start_date.addDays(distance < 0 ? distance : distance - 7);
      for (let i = 0; i < 35; i++) {
        date_arr.push(start_date.addDays(i))
      }
      this.date_arr = date_arr;
      this.start_date = start_date;
    }
  },
  created() {
    this.init()
  },
  watch: {
    date() {
      this.init()
    },
    startWeek() {
      this.init()
    }
  },
  computed: {
    shaded() {
      return this.$store.state.config.calendar.shadedWeekend
    },
    startWeek() {
      return this.$store.state.config.calendar.day_start_week
    }
  }
}
</script>

<style scoped>

</style>
