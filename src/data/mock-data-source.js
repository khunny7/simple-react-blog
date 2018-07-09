import Promise from 'bluebird';

const postings = {
  '123456': {
    title: 'Heeya Heaya',
    date: '2015-05-01T22:12:03.284Z',
    content: "{\"blocks\":[{\"key\":\"cbm59\",\"text\":\"Once upon a time, there was a beautiful princess named HEeya Heeya. She was kind and gentle and a friend to all animals.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2ac6t\",\"text\":\"Heeya i love you!\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    id: '123456',
  },
};

const getPostings = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(postings);
    }, 1000);
  });
}

const getPostingAsync = (postingId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(postings[postingId]);
    }, 2000);
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
      resolve(savedItem)
    }, 3000)
  });
}

export {
  getPostingAsync,
  getPostings,
  savePostingAsync
};
