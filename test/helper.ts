export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve(jasmine.Ajax.requests.mostRecent())
    }, 0)
  })
}
