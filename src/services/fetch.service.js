import fetch from 'node-fetch';

export default function (url, onSuccess, onFail) {
  return fetch(url).then((response) => {
    if (response.status >= 400) {
      throw new Error(`Bad response from server. [${response.status}]`);
    }
    return response.json();
  })
    .then(data => onSuccess(data))
    .catch(error => onFail(error));
}
