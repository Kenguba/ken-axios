import Xhr from '../src/xhr'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(new Xhr('/user/login', {})).toBeInstanceOf(Xhr)
  })
})
