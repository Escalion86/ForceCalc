function formatDateTime(dateTime) {
  if (!dateTime) return undefined
  var d = new Date(dateTime),
    minutes = '' + d.getMinutes(),
    hours = '' + d.getHours(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate()
  // year = '' + d.getFullYear()
  // console.log(`getTimezoneOffset`, new Date().getTimezoneOffset())

  // if (day.length < 2) day = '0' + day
  if (minutes.length < 2) minutes = '0' + minutes
  if (hours.length < 2) hours = '0' + hours
  if (month.length < 2) month = '0' + month
  // year = year.substr(2)
  return [day, month, hours, minutes].join('')
}

export default formatDateTime
