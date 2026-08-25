export default () => (ts: string | number | undefined | null) => {

  if (!ts) return undefined

  const timestampInSeconds
    = typeof ts === 'number' ? ts : Number.parseInt(ts.split('.')[0])

  return new Date(timestampInSeconds * 1000)
}
