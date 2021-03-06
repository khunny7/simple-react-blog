import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button, Image } from 'react-bootstrap'
import { connect } from 'react-redux'

class AuthView extends React.Component {
  constructor(props) {
    super(props)

    this.onSignInWithGoogle = this.onSignInWithGoogle.bind(this)
  }

  onSignInWithGoogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
      console.log('user succesfully signed in')
    }).catch((error) => {
      console.error(error)
    })
  }

  onSignOut() {
    firebase.auth().signOut().then(() => {
      console.log('signed out')
    }).catch((error) => {
      console.error('error')
    })
  }

  render() {
    const noDisplayStyle = {
      display: "none",
    }

    const floatLeft = {
      float: "left"
    }

    if (this.props.currentUser) {
      return (
        <div>
          <Image
            width="60px"
            height="60px"
            style={floatLeft}
            src={this.props.currentUser.photoURL}
            circle
          />
          <div style={floatLeft}>
            {this.props.currentUser.displayName}
          </div>
          <Button onClick={this.onSignOut} style={floatLeft}>Sign out</Button>
        </div>
      )
    } else {
      return (
        <Button onClick={this.onSignInWithGoogle}>Sign In</Button>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const currentUser = state.currentUser

  return {
    currentUser,
  }
}

const Container = connect(mapStateToProps)(AuthView)

export default Container
