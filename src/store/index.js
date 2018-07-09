import appReducer from '../reducers/index'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {
  let result

  console.groupCollapsed(`dispatching action => ${action.type}`)
  console.log('postings', store.getState().postings.length)

  result = next(action)

  let { postings, postingView } = store.getState()

  console.log(`
        postings: ${JSON.stringify(postings)}
        postingView: ${JSON.stringify(postingView)}
    `)

  console.groupEnd()

  return result
}

export default (initialState = {}) => {
  const store = applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store
}