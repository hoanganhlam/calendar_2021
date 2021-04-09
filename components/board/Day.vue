<template>
  <div>
    <div class="p-2 border-b uppercase">
      <div class="text-sm">{{ day_names[date.getDay()] }}</div>
      <div class="text-xs">{{ date.getDate() }}</div>
    </div>
    <div v-for="i in limit" :key="i" class="border-b w-full relative">
      <noteable />
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardDay",
  props: {
    date: {
      default: () => {
        return new Date()
      },
      type: Date
    },
    limit: {
      default: 4,
      type: Number
    }
  },
  data() {
    return {
      day_names: ["sun", "mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    }
  }
}
</script>

<style scoped>

</style>
