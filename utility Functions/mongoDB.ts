import mongoose from 'mongoose'

const uri :string |undefined = process.env.MONGODB_URI

let cachedDb: any = global.mongoose

if (!cachedDb) {
  cachedDb = global.mongoose = { conn: null, promise: null }
}
// console.log(cachedDb)

export async function connectToDatabase () {
  if (cachedDb.conn) {
    return cachedDb.conn
  }
  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }

  if (!cachedDb.promise) {
    cachedDb.promise = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false
    })
  }
  cachedDb.conn = await cachedDb.promise
  return cachedDb.conn
}

// const client = await mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// const db = await client.db(dbName)

// cachedClient = client
// cachedDb = db

// return { client, db }
