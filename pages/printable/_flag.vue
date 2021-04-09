<template>
  <div class="flex -mx-4 flex-wrap" v-if="!$route.params.flag">
    <div v-for="i in 4" :key="i" class="px-4 mb-8 w-full md:w-1/2 leading-none">
      <div class="square mb-2">
        <div class="inside"></div>
      </div>
      <h2 class="text-lg font-bold text-gray-600">
        <n-link to="/printable/123">2021 Yearly Calendar | One page Calendar</n-link>
      </h2>
      <p class="text-gray-500 text-sm">A one page calendar. All 12 months of 2021 on a single page.</p>
    </div>
  </div>
  <div v-else>
    <div class="w-1/2 mx-auto">
      <h1 class="mb-4 text-2xl font-bold">2021 Monthly Calendar</h1>
      <div class="square mb-4">
        <div class="inside"></div>
      </div>
      <div class="flex mb-4 -mx-1">
        <div class="mx-1 flex-1 btn">Print</div>
        <div class="mx-1 flex-1 btn">Download</div>
        <div class="mx-1 flex-1 btn">Customize</div>
      </div>
      <p>You can print this calendar right now, or download it for reference or printing later. The calendar includes pages for all 12 months. Print it on any size paper, just choose the paper size from the drop down list above.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PagePrintable"
}
</script>

<style scoped>

</style>
