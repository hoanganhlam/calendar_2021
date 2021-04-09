<template>
  <div class="flex flex-col md:flex-row md:space-x-4">
    <div class="flex-1 mb-4">
      <div class="content">
        <h1 class="text-4xl">2021 Holidays</h1>
        <p class="text-xl">Below is a list of some of the most common holidays for 2021. Including the weekday they land
          on and how many days until the day.</p>
        <p class="text-xs italic">Click on the name of the holiday to see a list of all the dates that holiday will occur on
          for the next 10 years.</p>
      </div>
      <table class="my-3 min-w-max w-full table-auto">
        <thead>
        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-2 px-4 text-left">Date</th>
          <th class="py-2 px-4 text-left"></th>
          <th class="py-2 px-4 text-center">Holiday</th>
          <th class="py-2 px-4 text-center">Days until</th>
        </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
        <tr class="border-b border-gray-200 hover:bg-gray-100">
          <td class="py-2 px-4 text-left whitespace-nowrap">
            <div class="flex items-center">
              <div class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     width="24" height="24"
                     viewBox="0 0 48 48"
                     style=" fill:#000000;">
                  <path fill="#80deea" d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"></path><path fill="#80deea" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"></path><path fill="#80deea" d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"></path><circle cx="24" cy="24" r="4" fill="#80deea"></circle>
                </svg>
              </div>
              <span class="font-medium">React Project</span>
            </div>
          </td>
          <td class="py-2 px-4 text-left">
            <div class="flex items-center">
              <div class="mr-2">
                <img class="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"/>
              </div>
              <span>Eshal Rosas</span>
            </div>
          </td>
          <td class="py-2 px-4 text-center">
            <div class="flex items-center justify-center">
              <img class="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125" src="https://randomuser.me/api/portraits/men/1.jpg"/>
              <img class="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125" src="https://randomuser.me/api/portraits/women/2.jpg"/>
              <img class="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125" src="https://randomuser.me/api/portraits/men/3.jpg"/>
            </div>
          </td>
          <td class="py-2 px-4 text-center">
            <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
          </td>
        </tr>
        <tr class="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
          <td class="py-2 px-4 text-left">
            <div class="flex items-center">
              <div class="mr-2">
                <img class="w-6 h-6" src="https://img.icons8.com/color/100/000000/vue-js.png"/>
              </div>
              <span class="font-medium">Vue Project</span>
            </div>
          </td>
          <td class="py-2 px-4 text-left">
            <div class="flex items-center">
              <div class="mr-2">
                <img class="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/women/2.jpg"/>
              </div>
              <span>Anita Rodriquez</span>
            </div>
          </td>
          <td class="py-2 px-4 text-center">
            <div class="flex items-center justify-center">
              <img class="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125" src="https://randomuser.me/api/portraits/men/1.jpg"/>
              <img class="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125" src="https://randomuser.me/api/portraits/women/2.jpg"/>
              <img class="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125" src="https://randomuser.me/api/portraits/men/3.jpg"/>
            </div>
          </td>
          <td class="py-2 px-4 text-center">
            <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Completed</span>
          </td>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-100">
          <td class="py-2 px-4 text-left">
            <div class="flex items-center">
              <div class="mr-2">
                <img class="w-6 h-6" src="https://img.icons8.com/color/100/000000/angularjs.png"/>
              </div>
              <span class="font-medium">Angular Project</span>
            </div>
          </td>
          <td class="py-2 px-4 text-left">
            <div class="flex items-center">
              <div class="mr-2">
                <img class="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/3.jpg"/>
              </div>
              <span>Taylan Bush</span>
            </div>
          </td>
          <td class="py-2 px-4 text-center">
            <div class="flex items-center justify-center">
              <img class="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125" src="https://randomuser.me/api/portraits/men/1.jpg"/>
              <img class="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125" src="https://randomuser.me/api/portraits/women/2.jpg"/>
              <img class="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125" src="https://randomuser.me/api/portraits/men/3.jpg"/>
            </div>
          </td>
          <td class="py-2 px-4 text-center">
            <span class="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">Scheduled</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-for="k in 3" :key="k" class="mb-3 border">
        <div class="py-2 px-4 border-b bg-gray-100">
          <h4>See all holidays for a specific year</h4>
        </div>
        <ul>
          <li class="py-2 px-4 border-b border-dashed last:border-b-0" v-for="i in 5" :key="i">{{2020 + i}} holidays</li>
        </ul>
      </div>
    </div>
    <sidebar/>
  </div>
</template>

<script>
import Sidebar from "~/components/Sidebar";

export default {
  name: "PageHoliday",
  components: {Sidebar}
}
</script>

<style scoped>

</style>
