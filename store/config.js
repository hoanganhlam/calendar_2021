export default {
  namespaced: true,
  state: () => ({
    calendar: {
      day_start_week: 1,
      showHoliday: false,
      show12Month: false,
      shadedWeekend: false
    },
  }),
  mutations: {
    ['SET_CONFIG_CALENDAR'](state, data) {
      state.calendar = data;
    }
  },
}
