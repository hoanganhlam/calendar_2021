<template>
  <div class="year-board grid grid-cols-3 gap-5 print:gap-3">
    <div class="border border-gray-300" v-for="i in 12" :key="i">
      <h4 class="bg-red-500 print:bg-none print:text-black p-1 text-center text-white text-sm py-0.5 font-bold">
        <n-link class="text-white" :to="`/month/${month_names[i - 1].replace('m.', '')}-${start_date.getFullYear()}`">
          <span>{{ $t(month_names[i - 1]) }} {{start_date.getFullYear()}}</span>
        </n-link>
      </h4>
      <div class="p-1 text-sm">
        <cell-month :date="start_date.addMonths(i - 1)"/>
      </div>
    </div>
  </div>
</template>

<script>

import CellMonth from "@/components/cell/Month.vue";
export default {
  name: "BoardYear",
  props: {
    date: {
      default: () => {
        return new Date()
      },
      type: Date
    }
  },
  components: {CellMonth},
  data() {
    return {
    }
  },
  methods: {
    init() {
      this.start_date = new Date(this.date.getFullYear())
    }
  },
  computed: {
    start_date() {
      return new Date(this.date.getFullYear(), 0, 1)
    }
  }
}
</script>

<style scoped>
@media print and (orientation:landscape) {
  .year-board {
    @apply print:grid-cols-4;
  }
}
</style>
