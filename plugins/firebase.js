import firebase from 'firebase'

// copy the config from the console https://console.firebase.google.com/u/0/project/sign-11111/settings/general/
const firebaseConfig = {
  apiKey: "AIzaSyA1VY4PB-LvNp4LM58zBN3w4kRSQ-edvHo",
  authDomain: "calendarzones.firebaseapp.com",
  projectId: "calendarzones",
  storageBucket: "calendarzones.appspot.com",
  messagingSenderId: "356122801607",
  appId: "1:356122801607:web:d6aab42e5800a77bb555e2",
  measurementId: "G-LPGD1P11F2"
};
let app = null
// prevent initializing firebase more than once
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}
// inject it so it can be accessed as this.$firebase inside the project
export default (ctx, inject) => {
  inject('firebase', firebase)
}
