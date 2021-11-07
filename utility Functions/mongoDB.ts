import { MongoClient } from 'mongodb'

const uri :string |undefined = process.env.MONGODB_URI
const dbName:string |undefined = process.env.MONGODB_DB

let cachedClient:any = null
let cachedDb:any = null

export async function connectToDatabase () {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }
  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }

  if (!dbName) {
    throw new Error(
      'Please define the MONGODB_DB environment variable inside .env.local'
    )
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
