import { MongoClient } from 'mongodb'

let _fullClient: MongoClient | null = null

export const fullClient = async () => {
  if (_fullClient === null) {
    const uri = useRuntimeConfig().mongodbUri
    try {
      _fullClient = await MongoClient.connect(uri)
    }
    catch (e) {
      console.error('Failed to connect to mongo', e)
      throw e
    }
  }
  return _fullClient
}

export const mongo = async (dbUuid: string) => {
  return fullClient().then(c => c.db(dbUuid))
}
