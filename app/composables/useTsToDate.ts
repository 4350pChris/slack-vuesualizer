export default () => (ts: string | number | undefined | null) => {

  if (!ts) return undefined

  const [seconds = '0'] = typeof ts === 'number' ? [] : ts.split('.')
  const timestampInSeconds = typeof ts === 'number' ? ts : Number.parseInt(seconds)

  return new Date(timestampInSeconds * 1000)
}
