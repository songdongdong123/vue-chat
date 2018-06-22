const forMatDate = utc => {
  if (utc) {
    let date = new Date(utc)
    let y = date.getUTCFullYear()
    let M = date.getUTCMonth() + 1
    let d = date.getUTCDate()
    let h = date.getUTCHours() + 8
    let m = date.getUTCMinutes()
    let s = date.getUTCSeconds()
    return `${y}-${M}-${d} ${h}:${m}:${s}`
  }
}

export {
  forMatDate
}
