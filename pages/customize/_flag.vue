<template>
  <div class="flex items-center md:space-x-4">
    <div class="w-1/2">
      <div v-for="(field, i) in Object.keys(fields)" :key="i" class="mb-2 flex space-x-3">
        <div class="w-1/3 text-right">{{ $t(`customize.${field}.title`) }}</div>
        <div class="flex-1 flex -mx-1 mb-1 flex-wrap">
          <template v-for="val in fields[field]">
            <div :key="val" class="mx-1 mb-1 btn sm hover:bg-green-300"
                 :class="{'bg-green-300': val === options[field], 'shadow-inner': val === options[field]}"
              @click="options[field] = val"
            >
              <span v-if="typeof val === 'string'">{{ $t(`customize.${field}.value.${val}`) }}</span>
              <span v-else>{{val}}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="w-1/2">
      <div class="square mb-4">
        <div class="inside">
          <img src="http://127.0.0.1:3000/api/maker?preview=true" alt="">
        </div>
      </div>
      <div class="flex -mx-1.5">
        <div class="flex-1 mx-1.5 btn bg-gray-600 text-white hover:bg-gray-100 hover:text-black">Download</div>
        <div class="flex-1 mx-1.5 btn bg-gray-600 text-white hover:bg-gray-100 hover:text-black">Print</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageCustomize",
  data() {
    return {
      fields: {
        type: ['monthly', 'yearly', 'two_month', 'four_month', 'six_month'],
        year: [2019, 2020, 2021],
        day_size: ['big', 'normal', 'small'],
        orientation: ['landscape', 'portrait'],
        paper_size: ["letter", "11x17", "legal", "poster", "movie_poster", "a4"],
        weekend_shaded: ['true', 'false'],
        grid_lines: ['true', 'false'],
        grid_color: ["gray", "black"],
        weekday_start: ["sunday", "monday"],
        month_start: [
          "january", "february", "march", "april", "may", "june",
          "july", "august", "september", "october", "november", "december"
        ],
      },
      options: {
        type: 'monthly',
        year: 2021,
        day_size: 'normal',
        orientation:'portrait',
        paper_size: 'a4',
        weekend_shaded: 'true',
        grid_lines: 'true',
        grid_color: 'black',
        weekday_start: 'monday',
        month_start: 'april'
      }
    }
  }
}
</script>

<style></style>
