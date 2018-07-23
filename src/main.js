// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App';
import router from './router';
import firebase from 'firebase';
import './firebase/init';

Vue.config.productionTip = false;
Vue.use(Vuetify);

/* eslint-disable no-new */
let app;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App },
    });
  }
});