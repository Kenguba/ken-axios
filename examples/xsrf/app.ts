import axios, { AxiosError } from '../../src/index'
const instance = axios.create({
  xsrfHeaderName: 'XSRF-TOKEN-D',
  xsrfCookieName: 'X-XSRF-TOKEN-D',
})

instance.get('/server/more/get').then(res => {
  console.log(res);

})