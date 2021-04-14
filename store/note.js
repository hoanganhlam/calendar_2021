export default {
  namespaced: true,
  state: () => ({
    notes: [
      // {date: '2021-01-01', value: ''}
    ]
  }),
  mutations: {
    ['SET_NOTES'](state, payload) {
      state.notes = payload;
    },
    ['ADD_NOTE'](state, payload) {
      let index = -1
      for (let i = 0; i < state.notes.length; i++) {
        if (state.notes[i].date === payload.date && state.notes[i].index === payload.index) {
          index = i;
          break
        }
      }
      if (index >= 0) {
        state.notes[index].value = payload.value
      } else {
        state.notes.push(payload);
      }
    },
    ['REMOVE_NODE'](state, {date, index}) {
      let x = -1
      for (let i = 0; i < state.notes.length; i++) {
        if (state.notes[i].date === date && state.notes[i].index === index) {
          x = i;
          break
        }
      }
      if (x >= 0) {
        state.notes.splice(x, 1)
      }
    }
  },
}
