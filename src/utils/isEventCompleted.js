export function isEventCompleted(event) {
  const start = event.dates?.start

  if (!start || start.dateTBA || start.dateTBD) {
    return false
  }

  if (start.dateTime) {
    return new Date(start.dateTime).getTime() < Date.now()
  }

  if (start.localDate) {
    return new Date(start.localDate + 'T23:59:59').getTime() < Date.now()
  }

  return false
}
