import C from '../constants'
import _ from 'lodash'
import { combineReducers } from 'redux'

export const posting = (state = null, action) => {
  if (action.type === C.addPosting) {
    return action.payload
  } else {
    return state
  }
}

export const postings = (state = [], action) => {
  if (action.type === C.addPosting) {
    // check if has posting already

    const newState = [
      ...state,
      posting(null, action)
    ];

    console.log('returning new state' + newState);

    return newState;
  } else if (action.type === C.removePosting) {
    const newState = {}
    _.each(state, (item) => {
      if (item.id !== action.payload) {
        newState[item.id] = item
      }
    })

    return newState
  } else if (action.type === C.setPostings) {
    return action.payload
  } else {
    return state
  }
}

export const postingListView = (state = {}, action) => {
  switch (action.type) {
    case C.setPostingListViewState:
      const newState = {
        isLoading: action.payload.hasOwnProperty('isLoading') ? action.payload.isLoading : state.isLoading,
        pageNumber: action.payload.hasOwnProperty('pageNumber') ? action.payload.pageNumber : state.pageNumber,
        hasMore: action.payload.hasOwnProperty('hasMore') ? action.payload.hasMore : state.hasMore,
      }

      return newState;

    default:
      return state;
  }
}

export const postingView = (state = {
  isLoading: true,
  currentPosting: {
    title: 'Loading',
    content: 'Loading'
  }
}, action) => {
  if (action.type === C.setPostingViewPosting) {
    const newState = {}

    newState.isLoading = state.isLoading
    newState.currentPosting = action.payload

    return newState
  } else if (action.type === C.setPostingViewIsLoading) {
    const newState = {}

    newState.isLoading = action.payload
    newState.currentPosting = state.currentPosting

    return newState
  } else {
    return state
  }
}

export const currentPosting = (state = null, action) => {
  if (action.type === C.setCurrentPosting) {
    return action.payload
  } else {
    return state
  }
}

export default combineReducers({
  // posting,
  postings,
  postingListView,
  currentPosting,
  postingView
})
