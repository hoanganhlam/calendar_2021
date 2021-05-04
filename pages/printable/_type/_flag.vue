<template>
  <div>
    <div class="md:w-2/3 mx-auto mb-8 text-center">
      <h1 class="text-4xl font-bold mb-2">{{ meta.title }}</h1>
      <p>{{ meta.desc }}</p>
    </div>
    <div v-if="instance" class="mb-8 -mx-2 flex">
      <div class="md:w-2/3 px-2">
        <div class="square mb-4">
          <div class="inside">
            <img class="w-full h-full object-contain" :src="imageURL({
              type: instance.type || type,
              style: instance.style,
              year,
              month_start
            })" :alt="instance.name">
          </div>
        </div>
      </div>
      <div class="md:w-1/3 px-2">
        <p class="text-sm mb-2">You can print this calendar right now, or download it for reference or printing later. The calendar includes
          pages for all 12 months. Print it on any size paper, just choose the paper size from the drop down list
          above.</p>
        <div class="mb-4">
          <div class="py-1">
            <div class="btn justify-center" @click="print(instance)">Print</div>
          </div>
          <div class="py-1">
            <a target="_blank" download :href="downloadUrl(instance)" class="btn justify-center">Download</a>
          </div>
          <div class="py-1">
            <div class="btn justify-center" @click="customize(instance)">Customize</div>
          </div>
        </div>
      </div>
    </div>
    <h2 v-if="instance" class="mb-2 uppercase font-bold text-center">Other styles</h2>
    <div class="flex -mx-4 flex-wrap">
      <div v-for="(item, i) in dataset" :key="i" class="px-4 mb-8 w-full md:w-1/3 leading-none">
        <div class="square mb-2">
          <div class="inside">
            <img class="w-full h-full object-contain" :src="imageURL({
              type: item.type || type,
              style: item.style,
              year,
              month_start
            })" :alt="item.name">
          </div>
        </div>
        <h2 class="font-bold">
          <n-link :to="slug(item)">
            <span>{{ $t(`page.printable.page.${item.type || type}.title`, [year]) }}</span>
          </n-link>
        </h2>
        <p class="text-gray-500 text-sm">{{ $t(`page.printable.page.${item.type || type}.desc`, [year]) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const printJS = process.client ? require('print-js') : null
const current = new Date()
export default {
  name: "PagePrintable",
  data() {
    return {
      dataset: [],
      type: 'year',
      year: current.getFullYear(),
      month_start: 1,
      current,
      instance: null
    }
  },
  head() {
    return {
      title: this.meta.title
    }
  },
  computed: {
    meta() {
      if (!this.$route.params.type) {
        return {
          title: this.$t(`page.printable.title`, [current.getFullYear()]),
          desc: this.$t(`page.printable.desc`, [current.getFullYear()])
        }
      } else if (!this.$route.params.flag) {
        return {
          title: this.$t(`page.printable.page.${this.type}.title`, [current.getFullYear()]),
          desc: this.$t(`page.printable.page.${this.type}.desc`, [current.getFullYear()])
        }
      } else if (this.instance) {
        return {
          title: this.$t(`page.printable.page.${this.instance.type || this.type}.title`, [current.getFullYear()]),
          desc: this.$t(`page.printable.page.${this.instance.type || this.type}.desc`, [current.getFullYear()])
        }
      } else {
        return {}
      }
    }
  },
  async fetch() {
    let uri = this.$route.path;
    if (this.$route.params.flag) {
      uri = uri.replace(this.$route.params.flag, '')
    }
    this.dataset = await this.$axios.$get(uri)
    let slug = this.$route.params.type
    if (this.$route.params.type) {
      let type, year, month_start;
      let arr = slug.split("calendar")
      let arr_type = arr[0].split("-")
      arr_type = arr_type.filter(x => x !== '')
      if (arr_type[0] === 'monthly') {
        type = "m"
        year = arr_type[1]
      } else if (arr_type[0] === 'year') {
        type = "12m"
        year = arr_type[1]
      } else {
        type = arr_type[0]
        month_start = [1]
        year = arr_type[2]
      }
      if (!year) year = current.getFullYear();
      if (!month_start) month_start = 1;
      this.type = type;
      this.month_start = month_start;
      this.year = year
      if (!this.$route.params.flag) {
        this.instance = this.dataset[0]
      } else {
        this.instance = this.dataset.filter(x => x.style === this.$route.params.flag)[0]
      }
    }
  },
  methods: {
    customize(item) {
      this.$router.push('/customize?' + this.serialize({
        style: item.style,
        type: this.type,
        year: this.year,
        month_start: this.month_start
      }))
    },
    print(item) {
      printJS({printable: this.downloadUrl(item), type: 'pdf', showModal: true})
    },
    downloadUrl(item) {
      return process.env.API_ENDPOINT + '/maker?' + this.serialize({
        ...item,
        type: this.type,
        year: this.year,
        month_start: this.month_start
      })
    },
    slug(item) {
      let out = '/printable/'
      if (item.type) {
        if (item.type === 'm') {
          out = out + 'monthly'
        } else if (item.type === '12m') {
          out = out + 'year'
        } else {
          out = out + item.type
        }
      } else {
        out = out + this.$route.params.type
      }
      if (item.style) {
        out = out + '/' + item.style
      }
      return out
    }
  }
}
</script>

<style scoped>

</style>
