import React from 'react'
import JakeTheDog from '../assets/jake.png'
import { Link, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from './components/header'
import IndexPage from './pages/index'
import NewPosting from './pages/newPosting'
import PostingPage from './pages/posting'
import storeFactory from './store'
import initialState from './store/initial-state.json'

window.store = storeFactory(initialState)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

/* Category component */
const Category = () => (
  <div>
    <h2>Category</h2>
  </div>
)

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
          <div>
            <Route exact={true} path="/" component={IndexPage} />
            <Route path="/new-posting" component={NewPosting} />
            <Route path="/posting" component={PostingPage} />
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
