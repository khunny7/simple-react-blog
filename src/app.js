import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { Provider } from 'react-redux'
import Header from './components/header'
import IndexPage from './pages/index'
import NewPosting from './pages/newPosting'
import PostingPage from './pages/posting'
import storeFactory from './store'
import firebase from 'firebase/app'
import 'firebase/database'
import { setCurrentUser } from './store/actions'
import { getUserAsync, saveUserAsync } from './data/firebase-user-repository'

window.store = storeFactory()

var config = {
  apiKey: "AIzaSyAp96EpEv29_8u-Ip_NBs86QRxo_AUDNZo",
  authDomain: "humoronly-db65d.firebaseapp.com",
  databaseURL: "https://humoronly-db65d.firebaseio.com",
  projectId: "humoronly-db65d",
  storageBucket: "humoronly-db65d.appspot.com",
  messagingSenderId: "572984294366"
}

window.firebaseApp = firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    getUserAsync(user.uid).then((savedUser) => {
      if (savedUser) {
        store.dispatch(setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        }));
      } else {
        saveUserAsync({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }).catch((error) => {
          console.error(error)
        })
      }
    }).catch((error) => {
      console.error(error)
    })
  } else {
    store.dispatch(setCurrentUser(null))
  }
})


class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <Grid>
            <Route exact={true} path="/" component={IndexPage} />
            <Route path="/new-posting" component={NewPosting} />
            <Route path="/posting" component={PostingPage} />
          </Grid>
        </div>
      </Provider>
    )
  }
}

export default App
