import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    userName: localStorage.getItem('userName') || '',
    historialTransactions: [],


  },
  mutations: {
    setuserName(state, userName) {
      state.userName = userName;
      localStorage.setItem('userName', userName)
    },
    availabilityTransaction(state, transaccion) {
      state.historialTransactions.push(transaccion);

    }


  },
  actions: {},
  modules: {},
});
