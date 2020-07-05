import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
import user from '@/store/modules/user';


const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
  },
  plugins: [
    /* encrypt data persisted in localStorage by vuex-persistedstate */
    createPersistedState({
      paths: ['user'],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
    /* use createPersistedState below for testing, because
    information persisted by vuex-persistedstate is not encrypted */
    // createPersistedState({
    //   paths: ['user'],
    // }),
  ],
});
