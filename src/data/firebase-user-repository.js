import _ from 'underscore'
import firebase from 'firebase/app'

const getUserAsync = (uid) => {
  var database = firebase.database()
  var userDBRef = database.ref('users').child(uid)

  return userDBRef.once('value').then(snapshot => snapshot.val())
}

const saveUserAsync = (userData) => {
  var database = firebase.database()

  return database.ref('users/' + userData.uid).set({
    uid: userData.uid,
    displayName: userData.displayName,
    email: userData.email,
    photoURL: userData.photoURL
  })
}

export {
  getUserAsync,
  saveUserAsync,
};
