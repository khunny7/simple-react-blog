import Promise from 'bluebird';
import _ from 'underscore';

const postings = {}

const loadedPostings = window.localStorage.getItem("postings")

if (loadedPostings) {
  const parsedPostings = JSON.parse(loadedPostings)

  _.extend(postings, parsedPostings)
} else {
  postings['123456'] = {
    title: 'Heeya Heaya',
    date: '2015-05-01T22:12:03.284Z',
    content: "{\"blocks\":[{\"key\":\"cbm59\",\"text\":\"Once upon a time, there was a beautiful princess named HEeya Heeya. She was kind and gentle and a friend to all animals.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2ac6t\",\"text\":\"Heeya i love you!\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    id: '123456',
  }

  postings['123457'] = {
    title: 'Awesome Heeya Heaya',
    date: '2015-05-01T22:12:03.284Z',
    content: "{\"blocks\":[{\"key\":\"cbm59\",\"text\":\"Once upon a time, there was an awesome princess named HEeya Heeya. She was kind and gentle and a friend to all animals.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2ac6t\",\"text\":\"Heeya i love you!\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    id: '123457',
  }
}

const getPostings = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.values(postings));
    }, 1000);
  });
}

const getPostingListAsync = (pageNumber = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pageSize = 5; // default page size is 5;
      const postingsArr = Object.values(postings)
      const startIndex = pageSize * pageNumber

      if (postingsArr.length <= pageNumber * pageSize) {
        resolve({
          postings: [],
          hasMore: false,
        })
      } else {
        resolve({
          postings: postingsArr.slice(startIndex, startIndex + pageSize),
          hasMore: postingsArr.length > startIndex + pageSize,
        })
      }

      resolve(Object.values(postings))
    }, 500)
  })
}

const getPostingAsync = (postingId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(postings[postingId]);
    }, 500);
  });
}

const savePostingAsync = (title, content) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedItem = {
        title,
        content,
        date: (new Date()).toString(),
        id: (new Date()).toString()
      }
      postings[savedItem.id] = savedItem

      window.localStorage.setItem("postings", JSON.stringify(postings))
      resolve(savedItem)
    }, 500)
  });
}

export {
  getPostingAsync,
  getPostings,
  savePostingAsync,
  getPostingListAsync
};
