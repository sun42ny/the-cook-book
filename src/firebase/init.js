import firebase from 'firebase'
// eslint-disable-next-line no-unused-vars
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyAsdcZ2-GUt-Qc0vtzTu154bmdZ5afyuO8',
  authDomain: 'the-cook-book-b1fa1.firebaseapp.com',
  databaseURL: 'https://the-cook-book-b1fa1.firebaseio.com',
  projectId: 'the-cook-book-b1fa1',
  storageBucket: 'the-cook-book-b1fa1.appspot.com',
  messagingSenderId: '815870582071',
  appId: '1:815870582071:web:50be2bcb4edecd20384eb2'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()
