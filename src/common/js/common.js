const getCookie = function (name) {
  let arr = []
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

const getChatId = function (userId, targetId) {
  return [userId, targetId].sort().join('_')
}

export {
  getCookie,
  getChatId
}
