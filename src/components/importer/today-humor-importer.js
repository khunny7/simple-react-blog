import Promise from 'bluebird'
import httpinvoke from 'httpinvoke'
import { resolve } from 'path';

const importContent = (url) => {
  return new Promise((resolve, reject) => {
    httpinvoke(url, 'GET').then((res) => {
      const body = res.body;
      const bodyElement = document.createElement('html')

      bodyElement.innerHTML(body)
      const content = bodyElement.getElementsByClassName('contentContainer')[0];

      console.log(content);

      resolve(content)
    }, (err) => {
      console.log('Failure', err)

      reject(err)
    });
  })
};

export default importContent