import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { apolloClient } from '@/apollo/client';
import { renewAccessToken } from '@/auth/accessToken';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/tailwind.css';

Vue.config.productionTip = false;
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

renewAccessToken().then(() => {
  new Vue({
    router,
    store,
    apolloProvider,
    render: (h) => h(App),
  }).$mount('#app');
});
