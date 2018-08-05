import Promise from 'bluebird'
import _ from 'underscore'
import firebase from 'firebase/app'

const postings = {}

const getPostings = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.values(postings));
    }, 1000);
  });
}

const getNextPostingListAsync = (endAtTimestamp = null) => {
  const pageSize = 5; // default page size is 5;

  const database = firebase.database()
  const postsRef = database.ref('posts')
    .orderByChild('timestamp')
    .endAt(endAtTimestamp)
    .limitToLast(pageSize)

  const postingsToReturn = []

  return new Promise((resolve, reject) => {
    postsRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        // filter out the last item (as it is already included)
        if (childData.timestamp !== endAtTimestamp) {
          postingsToReturn.unshift(childData)
        }
      })

      resolve({
        postings: postingsToReturn,
        hasMore: true,
      })
    })
  })
}

const getPostingListAsync = () => {
  const pageNumber = 0
  const pageSize = 5 // default page size is 5;
  const postingsArr = Object.values(postings)
  const startIndex = pageSize * pageNumber

  const database = firebase.database()
  const postsRef = database.ref('posts')
    .orderByChild('timestamp')
    .limitToLast(pageSize)

  const postingsToReturn = []

  return new Promise((resolve, reject) => {
    postsRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        postingsToReturn.unshift(childData)
      })

      resolve({
        postings: postingsToReturn,
        hasMore: true,
      })
    })
  })
}

const getPostingAsync = (postingId) => {
  var database = firebase.database()
  var targetPostingRef = database.ref('posts').child(postingId)

  return targetPostingRef.once('value').then(snapshot => snapshot.val())
}

const savePostingAsync = (title, content) => {
  if (_.isNull(store.getState().currentUser)) {
    throw new Error("Current user is null")
  }

  var database = firebase.database()
  var newPostKey = database.ref().child('posts').push().key

  const postData = {
    title,
    content,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    id: newPostKey,
    authorUid: store.getState().currentUser.uid,
    authorDisplayName: store.getState().currentUser.displayName,
  }

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;

  return database.ref().update(updates);
}

export {
  getPostingAsync,
  getPostings,
  savePostingAsync,
  getPostingListAsync,
  getNextPostingListAsync
};
