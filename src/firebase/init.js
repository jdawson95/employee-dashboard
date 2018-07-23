import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDb2uE39pOb9Pg2WMj_lqqMbu-2SU_UErc",
    authDomain: "dashboard-7bd14.firebaseapp.com",
    databaseURL: "https://dashboard-7bd14.firebaseio.com",
    projectId: "dashboard-7bd14",
    storageBucket: "dashboard-7bd14.appspot.com",
    messagingSenderId: "697541862205"
  };
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// Export Firestore DB
export default firebaseApp.firestore();
