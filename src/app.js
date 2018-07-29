import React from 'react'
import JakeTheDog from '../assets/jake.png'
import { Link, Route, Switch } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { Provider } from 'react-redux'
import Header from './components/header'
import IndexPage from './pages/index'
import NewPosting from './pages/newPosting'
import PostingPage from './pages/posting'
import storeFactory from './store'
import initialState from './store/initial-state.json'

window.store = storeFactory()

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>
            {this.props.title}
          </h1>
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
