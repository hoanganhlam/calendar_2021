<template>
  <div class="w-full week-board">
    <div class="grid border border-b-0 border-r-0" :class="{'grid-cols-7': !isDay}">
      <template v-for="(d, i) in date_arr">
        <div class="p-2 border-b border-r uppercase" :key="i" :class="{'bg-gray-50': d.isWeekend() && shaded}">
          <div class="text-sm">{{ day_names[d.getDay()] }}</div>
          <div class="text-xs">{{ d.getDate() }}</div>
        </div>
      </template>
    </div>
    <div class="grid border border-b-0 border-r-0" :class="{'grid-cols-7': !isDay}">
      <template v-for="(cell, i) in cells">
        <div class="border-b border-r w-full relative" :key="i" :class="{'bg-gray-50': cell.date.isWeekend() && shaded}">
          <noteable :id="`note-${i}`" :date="cell.date" :index="cell.index" @input="handleInput(i, $event)"/>
        </div>
      </template>
    </div>
    <div class="flex space-x-3 print:hidden">
      <div class="px-4 py-1.5 border space-x-2 inline-flex mt-4 cursor-pointer hover:bg-gray-50 hover:shadow-inner"
           @click="limit++">
        <icon name="plus"></icon>
        <span>{{ $t('add_row') }}</span>
      </div>
      <div v-if="limit"
           class="px-4 py-1.5 border space-x-2 inline-flex mt-4 cursor-pointer hover:bg-gray-50 hover:shadow-inner"
           @click="limit--">
        <icon name="minus"></icon>
        <span>{{ $t('remove_row') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardWeek",
  props: {
    date: {
      default: () => {
        return new Date()
      },
      type: Date
    }
  },
  data() {
    return {
      limit: 8,
      day_names: ["sun", "mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    }
  },
  methods: {
    handleInput(index, txt) {
      const nextIndex = index + (this.isDay ? 1 : 7);
      const test = nextIndex - this.cells.length
      if (test >= 0) {
        this.limit = this.limit + 1;
      }
      setTimeout(() => {
        document.querySelector(`#note-${nextIndex} .input`).focus();
      }, 50)
    }
  },
  computed: {
    shaded() {
      return this.$store.state.config.calendar.shadedWeekend
    },
    date_arr() {
      if (this.isDay) {
        return [this.date]
      } else {
        let date_arr = []
        let start_date = this.date
        let distance = this.$store.state.config.calendar.day_start_week - start_date.getDay()
        start_date = start_date.addDays(distance <= 0 ? distance : distance - 7);
        for (let i = 0; i < 7; i++) {
          date_arr.push(start_date.addDays(i))
        }
        return date_arr
      }
    },
    cells() {
      let out = []
      for (let i = 0; i < this.limit; i++) {
        this.date_arr.forEach(d => {
          out.push({
            date: d,
            index: i
          })
        })
      }
      return out
    }
  },
}
</script>

<style scoped>

</style>
