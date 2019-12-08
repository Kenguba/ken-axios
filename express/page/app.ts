import axios from '../../src/index'

axios('/page/get', {
  method: 'get',
  params: { a: 1, b: 2 }
}
)