const forMatDate = utc => {
  if (utc) {
    let date = new Date(utc)
    let y = date.getUTCFullYear()
    let M = date.getUTCMonth() + 1 >= 10 ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`
    let d = date.getUTCDate() >= 10 ? date.getUTCDate() : `0${date.getUTCDate()}`
    let h = date.getUTCHours() + 8 >= 10 ? date.getUTCHours() + 8 : `0${date.getUTCHours() + 8}`
    let m = date.getUTCMinutes() >= 10 ? date.getUTCMinutes() : `0${date.getUTCMinutes()}`
    let s = date.getUTCSeconds() >= 10 ? date.getUTCSeconds() : `0${date.getUTCSeconds()}`
    return `${y}-${M}-${d} ${h}:${m}:${s}`
  }
}
const chatDate = utc => {
  if (utc) {
    let date = new Date(utc)
    let M = date.getUTCMonth() + 1 >= 10 ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`
    let d = date.getUTCDate() >= 10 ? date.getUTCDate() : `0${date.getUTCDate()}`
    return `${M}-${d}`
  }
}

export {
  forMatDate,
  chatDate
}
