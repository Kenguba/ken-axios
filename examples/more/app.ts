import axios, { AxiosError } from '../../src/index'
document.cookie = 'a=b;'
axios.get('/server/more/get').then(res => {
  console.log(res);
})

axios.post('http://127.0.0.1:8888/server2/more/post', {}, {
  withCredentials: true
}).then(res => {
  console.log(res);
})