export default () => (ts: string) =>
  new Date(parseInt(ts.split(".")[0]) * 1000);
