import axios, { AxiosError } from '../../src/index'
document.cookie = 'a=b;'
axios.get('/more/get').then(res => {
  console.log(res);
})

axios.post('http://127.0.0.1:8888/more/server2', {}, {
  withCredentials: false
}).then(res => {
  console.log(res);
})