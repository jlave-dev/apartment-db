import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import config from './config';

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: firebase.app.App,
  }
}

const app = firebase.initializeApp(config.firebase);
Vue.prototype.$firebase = app;
