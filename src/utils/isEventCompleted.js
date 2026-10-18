export function isEventCompleted(event) {
  const start = event.dates?.start

  if (!start || start.dateTBA || start.dateTBD) {
    return false
  }

  if (event.dates?.end?.dateTime) {
    return new Date(event.dates.end.dateTime).getTime() < Date.now()
  }

  if (start.dateTime && !start.timeTBA) {
    return new Date(start.dateTime).getTime() < Date.now()
  }

  if (start.localDate) {
    return new Date(start.localDate + 'T23:59:59').getTime() < Date.now()
  }

  return false
}
