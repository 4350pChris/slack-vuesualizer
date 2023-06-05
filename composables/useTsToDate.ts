export default () => (ts: string | number) => {
  const timestampInSeconds
    = typeof ts === 'number' ? ts : Number.parseInt(ts.split('.')[0])

  return new Date(timestampInSeconds * 1000)
}
