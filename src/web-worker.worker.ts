/// <reference lib="webworker" />

import axios from 'axios';

addEventListener('message', ({ data: url }) => {
  let final: any;
  axios
    .get(url)
    .then((res) => {
      final = res;
    })
    .finally(() => {
      final.data.forEach((ele: any) => {
        postMessage(ele);
      });
    });
});
