<template>
  <div class="noteable flex flex-col">
    <div v-if="data.length" class="px-2">
      <div class="elm" v-for="(d, i) in data" :key="i">
        <span>{{d}}</span>
        <icon class="cursor-pointer" name="minus" @click.native="data.splice(i, 1)"></icon>
      </div>
    </div>
    <div ref="input" @keydown.enter="handleInput"  class="flex-1 p-2 text-xs" contenteditable="true"></div>
  </div>
</template>

<script>
export default {
  name: "Noteable",
  data() {
    return {
      data: []
    }
  },
  methods: {
    handleInput(e) {
      e.preventDefault()
      this.data.push(this.$refs.input.textContent)
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
