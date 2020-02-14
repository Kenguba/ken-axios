
export const getCookie = (name: any): any => {
  //var res = document.cookie.match(/\bcsrf_token=([^;]*)\b/)
  var res = document.cookie.match('\\b' + name + '=([^;]*)\\b');
  return res ? res[1] : undefined;
}


const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie