<template>
  <div class="noteable flex flex-col">
    <div v-if="notes.length && index === -1" class="px-2">
      <div class="elm" v-for="(d, i) in notes" :key="i">
        <span>{{ d.value }}</span>
        <icon class="cursor-pointer" name="minus" @click.native="removeNote(i)"></icon>
      </div>
    </div>
    <div ref="input" @keydown.enter="handleInput" class="input flex-1 p-2 text-xs" contenteditable="true"></div>
  </div>
</template>

<script>
export default {
  name: "Noteable",
  props: {
    date: {
      default: () => (new Date()),
      type: Date
    },
    index: {
      type: Number,
      default: -1
    }
  },
  methods: {
    formatDate(d) {
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear()
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    },
    handleInput(e) {
      e.preventDefault()
      this.$store.commit('note/ADD_NOTE', {
        date: this.formatDate(this.date),
        value: this.$refs.input.innerHTML,
        index: this.index < 0 ? (this.notes.length) : this.index
    })
      this.$refs.input.innerHTML = ''
      this.$emit('input', this.$refs.input.textContent)
    },
    removeNote(index) {
      this.$store.commit('note/REMOVE_NOTE', {
        date: this.formatDate(this.date),
        index: index
      })
    }
  },
  computed: {
    notes() {
      if (this.$store.state.note.notes) {
        return this.$store.state.note.notes.filter(x => {
          let flag = x.date === this.formatDate(this.date)
          if (this.index < 0) {
            return flag
          } else {
            return flag && x.index === this.index
          }
        })
      }
      return []
    }
  },
  watch: {
    notes: {
      deep: true,
      handler: function () {
        if (this.index >=0 && this.notes.length) {
          this.$refs.input.innerHTML = this.notes[0].value
        } else {
          this.$refs.input.innerHTML = ''
        }
      }
    }
  },
  mounted() {
    if (this.index >=0 && this.notes.length) {
      this.$refs.input.innerHTML = this.notes[0].value
    } else {
      this.$refs.input.innerHTML = ''
    }
  }
}
</script>

<style scoped>
.noteable {
  min-height: 4rem;
  height: 100%;
}

@media (min-width: 768px) {
  .noteable {
    min-height: 7.5rem;
  }

  .week-board .noteable {
    min-height: 3.5rem;
  }
}

.noteable div[contenteditable] {
  min-height: 2.5rem;
}

.noteable .elm {
  @apply py-0.5 flex justify-between;
}

.noteable .elm .icon {
  @apply absolute -right-2;
  opacity: 0;
}

.noteable .elm:hover {
  @apply bg-gray-100 -mx-2 px-2;
}

.noteable .elm:hover .icon {
  opacity: 1;
}
</style>
