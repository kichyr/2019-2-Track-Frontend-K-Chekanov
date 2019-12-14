import { usePosition } from 'use-position'

export function getHrefToGeolocation() {
  const { latitude, longitude, timestamp, accuracy, error } = usePosition()
  return `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
}
