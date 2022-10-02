import * as zip from '@zip.js/zip.js'

export const useZip = () => {
  const readZip = (file: File) => {
    return new zip.ZipReader(new zip.BlobReader(file)).getEntries({
      filenameEncoding: 'utf-8',
    })
  }

  const parseData = async (entries: zip.Entry[]): Promise<any[]> => {
    const parsedData: any[] = []
    for (const entry of entries) {
      const writer = new zip.TextWriter('utf-8')
      const data = await entry.getData(writer)
      // data should always be an array of objects
      parsedData.push(...JSON.parse(data))
    }
    return parsedData
  }

  return {
    readZip,
    parseData,
  }
}
