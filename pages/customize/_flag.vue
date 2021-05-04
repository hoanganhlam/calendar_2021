<template>
  <div class="flex items-center h-full md:space-x-4">
    <div class="w-1/2">
      <div v-for="(field, i) in Object.keys(fields)" :key="i" class="mb-2 flex space-x-3">
        <div class="w-1/3 text-right">{{ $t(`customize.${field}.title`) }}</div>
        <div class="flex-1 flex -mx-1 mb-1 flex-wrap">
          <template v-for="val in fields[field]">
            <div :key="val" class="mx-1 mb-1 btn sm hover:bg-gray-100 text-sm"
                 :class="{'bg-gray-100': val === options[field], 'shadow-inner': val === options[field]}"
                 @click="options[field] = val"
            >
              <span v-if="typeof val === 'string'">{{ $t(`customize.${field}.value.${val}`) }}</span>
              <span v-else>{{ val }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="w-1/2">
      <div class="square mb-4">
        <div class="inside bg-gray-100">
          <img class="w-full h-full object-contain" :src="previewUrl" alt="">
        </div>
      </div>
      <div class="flex -mx-1.5">
        <a class="flex-1 mx-1.5 btn bg-gray-600 text-white hover:bg-gray-100 hover:text-black justify-center"
           :href="downloadUrl" download target="_blank">Download</a>
        <div class="flex-1 mx-1.5 btn bg-gray-600 text-white hover:bg-gray-100 hover:text-black justify-center"
             @click="print()">Print
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const printJS = process.client ? require('print-js') : null

export default {
  name: "PageCustomize",
  data() {
    return {
      fields: {
        type: ['m', '12m', '2m', '4m', '6m'],
        year: [2019, 2020, 2021],
        day_size: ['large', 'small'],
        orientation: ['landscape', 'portrait'],
        paper_size: ["letter", "11x17", "legal", "poster", "movie_poster", "a4"],
        weekend_shaded: ['true', 'false'],
        grid_lines: ['true', 'false'],
        grid_color: ["DDD", "000"],
        weekday_start: ["0", "1"],
        month_start: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      },
      options: {
        type: 'm',
        year: 2021,
        day_size: 'small',
        orientation: 'portrait',
        paper_size: 'letter',
        weekend_shaded: 'true',
        grid_lines: 'true',
        grid_color: 'DDD',
        weekday_start: "0",
        month_start: "4"
      }
    }
  },
  methods: {
    print() {
      printJS({printable: this.downloadUrl, type: 'pdf', showModal: true})
    }
  },
  computed: {
    previewUrl() {
      return process.env.API_ENDPOINT + '/maker?preview=true&' + this.serialize(this.options) + (this.$route.query.force ? '&force=true' : '')
    },
    downloadUrl() {
      return process.env.API_ENDPOINT + '/maker?' + this.serialize(this.options) + (this.$route.query.force ? '&force=true' : '')
    }
  }
}
</script>

<style></style>
