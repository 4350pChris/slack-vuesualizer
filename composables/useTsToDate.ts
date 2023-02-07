export default () => (ts?: string | number) => {
  if (!ts)
    return null

  const timestampInSeconds
    = typeof ts === 'number' ? ts : parseInt(ts.split('.')[0])

  return new Date(timestampInSeconds * 1000)
}
