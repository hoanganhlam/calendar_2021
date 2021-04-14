<template>
  <div class="mx-auto md:px-0 h-screen flex flex-col">
    <header id="header" class="mb-8 py-3 print:hidden">
      <div class="container mx-auto">
        <div class="flex -mx-4 items-center justify-between">
          <div class="px-4">
            <div class="flex flex-col md:flex-row md:items-center -mx-4">
              <div class="px-4">
                <div class="leading-none">
                  <h1 class="uppercase text-xl font-bold">
                    <n-link to="/">CalendarPrinter</n-link>
                  </h1>
                  <span class="desc">{{ $t('desc') }}</span>
                </div>
              </div>
              <div class="px-4 -mx-4 flex">
                <n-link class="px-2" :to="`/year/${initDate.getFullYear()}`">{{ $t(`nav.yearly`) }}</n-link>
                <n-link class="px-2" :to="`/monthly/${initDate.getFullYear()}`">{{ $t(`nav.monthly`) }}</n-link>
                <n-link class="px-2" :to="`/week/${initDate.getWeekNumber()}-${initDate.getFullYear()}`">{{ $t(`nav.weekly`) }}</n-link>
                <n-link class="px-2" :to="`/day/${initDate.getDOY()}-${initDate.getFullYear()}`">{{ $t(`nav.daily`) }}</n-link>
                <n-link class="px-2" to="/customize">Customize</n-link>
                <n-link class="px-2" to="/printable">Printable</n-link>
                <n-link class="px-2" to="/holidays">Holidays</n-link>
              </div>
            </div>
          </div>
          <div class="px-4 flex space-x-3">
            <div class="btn" @click="modal = 'trans'">
              <icon name="trans"></icon>
            </div>
            <div v-show="false" class="btn" @click="modal = 'login'">
              <icon name="user"></icon>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main class="flex-1">
      <div class="container h-full mx-auto">
        <nuxt/>
      </div>
    </main>
    <footer class="mt-8 text-sm print:hidden">
      <div class="container mx-auto">
        <div class="mb-3 flex -mx-3">
          <n-link to="/" class="py-1.5 px-3 border border-white hover:border-green-400">{{$t('nav.standard_calendar')}}</n-link>
          <n-link to="/customize" class="py-1.5 px-3 border border-white hover:border-green-400">{{$t('nav.customize_calendar')}}</n-link>
          <n-link to="/printable" class="py-1.5 px-3 border border-white hover:border-green-400">{{$t('nav.printable_calendar')}}</n-link>
          <n-link to="/holidays" class="py-1.5 px-3 border border-white hover:border-green-400">{{$t('nav.holidays')}}</n-link>
        </div>
        <div class="mb-4">
          <p class="text-gray-500">© 2021 Sample.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
    <transition nade="fade">
      <div v-show="showModal" class="modal">
        <div class="mx-auto w-full md:w-1/4 md:mt-16 flex flex-col justify-end md:justify-start h-full">
          <div class="mb-2 flex justify-end">
            <div class="cursor-pointer ml-auto rounded-full bg-gray-50 shadow p-2.5 inline-flex" @click="modal=null">
              <icon name="close"></icon>
            </div>
          </div>
          <div v-if="modal === 'login'" class="modal-content">
            <h4 class="text-xl uppercase mb-4">{{$t('login')}}</h4>
            <div class="btn rounded-3xl justify-between hover:bg-gray-50">
              <span>{{$t('login_google')}}</span>
              <icon name="google"></icon>
            </div>
          </div>
          <div class="modal-content" v-else>
            <h4 class="text-xl uppercase mb-4">{{$t('change_lang')}}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="lo in locales" :key="lo.code" class="btn rounded-full justify-between hover:bg-gray-50">
                <img class="w-6 h-6" :src="`/flag/${lo.code}.svg`" :alt="lo.name">
                <span>{{lo.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal: null,
      locales: [
        {
          code: 'en',
          name: 'English'
        },
        {
          code: 'vi',
          name: 'Vietnam'
        },
        {
          code: 'fr',
          name: 'Français'
        }
      ]
    }
  },
  methods: {
    async signIn() {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      const result = await this.$firebase.auth().signInWithPopup(provider).catch(e => {
        console.log(e);
        return null
      })
      if (result) {
        const user = result.user
      }
    },
    test: async function() {
      const user = this.$firebase.auth().currentUser
    }
  },
  computed: {
    showModal() {
      return Boolean(this.modal)
    }
  },
  mounted() {
    const header = document.getElementById("header");
    const sticky = header.offsetTop;
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
    this.$nextTick(function () {
      window.onscroll = function () {
        myFunction()
      };
    })
    setInterval(() => {
      localStorage.setItem('calendar', JSON.stringify(this.$store.state.note.notes))
    }, 3000)
  }
}
</script>
<style>
@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-75%);
  }
  100% {
    opacity: 0.9;
    transform: translateY(0);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.today {
  @apply font-extrabold rounded-sm -ml-1.5 p-0.5 px-1.5 bg-red-100 print:bg-white print:font-normal print:ml-0;
}
a {
  @apply text-blue-700;
}

header.sticky {
  @apply z-50 bg-white top-0 border-b shadow py-2;
  position: sticky;
  animation: slide-down 0.35s;
}
header .desc {
  @apply text-sm text-gray-500;
}

header.sticky .desc {
  @apply hidden;
}

.container {
  @apply px-4 md:px-0;
}

.nuxt-link-active {
  @apply text-gray-500;
}
</style>
