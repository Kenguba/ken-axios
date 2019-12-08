import axios from '../../src/index'

axios({
  url: '/simple/get', options: {
    method: 'get',
    params: {
      a: 1,
      b: 2
    }
  }
})