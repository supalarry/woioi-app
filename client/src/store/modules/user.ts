/* eslint-disable no-shadow */
import { User } from '@/interfaces/auth/User';

const state = {
  user: null,
};

/* this.$store.getters.getLoggedInUser */
const getters = {
  getLoggedInUser(state: any) {
    return state.user;
  },
};

const mutations = {
  login(state: any, user: User) {
    state.user = user;
  },
  logout(state: any) {
    state.user = null;
  },
};

const actions = {
  login(state: any, user: User) {
    state.commit('login', user);
  },
  logout(state: any) {
    state.commit('logout');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
