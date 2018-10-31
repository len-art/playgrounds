import Firebase from "firebase/app"
import "firebase/firestore"
const config = {
  apiKey: "AIzaSyBeUuMvQIJIkwLHYodTrEe9RYQLTQSCXlI",
  authDomain: "testing-povio.firebaseapp.com",
  databaseURL: "https://testing-povio.firebaseio.com",
  projectId: "testing-povio",
  storageBucket: "testing-povio.appspot.com",
  messagingSenderId: "555567255086"
}

const firebase = Firebase.initializeApp(config)

const firestore = firebase.firestore()

firestore.settings({
  timestampsInSnapshots: true
})

export { firebase, firestore }
