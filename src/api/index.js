import 'es6-promise/auto'
import {api, axiosDefault as axios} from 'create-api'

function existsCache() {
};

function checkStatus(response) {
}

async function fetch(opt={}) {
  const res = await axios.get(url, { params: {} });
  return checkStatus(res);
}

export default {
  fetch: fetch
}