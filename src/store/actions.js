import C from '../constants'
import { savePostingAsync } from '../data/mock-data-source'

export const addPosting = (payload) => {
  return {
    type: C.addPosting,
    payload,
  }
}

export const removePosting = (id) => {
  return {
    type: C.removePosting,
    payload: id,
  }
}

export const addPostingAsync = (title, content) => (dispatch, getState) => {
  savePostingAsync(title, content).then((savedPosting) => {
    dispatch({
      type: C.addPosting,
      payload: savedPosting,
    })
  })
}

export const setPostingViewPosting = (posting, isLoading) => (dispatch, getState) => {
  dispatch({
    type: C.setPostingViewPosting,
    payload: posting,
  })
  dispatch({
    type: C.setPostingViewIsLoading,
    payload: isLoading,
  })
}

export const setCurrentPosting = (posting) => (dispatch, getState) => {
  dispatch({
    type: C.setCurrentPosting,
    payload: posting,
  })
}

export const setPostings = (postings) => {
  return {
    type: C.setPostings,
    payload: postings,
  }
}

export const setPostingListViewState = (payload) => {
  return {
    type: C.setPostingListViewState,
    payload,
  }
}

export const setCurrentUser = (payload) => {
  return {
    type: C.setCurrentUser,
    payload,
  }
}