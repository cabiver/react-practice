import type { NextApiRequest, NextApiResponse } from 'next'
import USER_SCHEME from '../../../models/usariname'
import mongoose from 'mongoose'
const MONGODB_URI :string |undefined = process.env.MONGODB_URI
type Data = {
  mensaje: string
  background : string | null
  icon: string | null
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    if (!MONGODB_URI) {
      return
    }
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    const user = await USER_SCHEME.findOne({
      usuari: req.query.id
    })
    if (!user) {
      res.status(401)
    }
    // console.log(user)
    res.send({ mensaje: 'url de imagen y icono enviada', background: user.background, icon: user.icon })
  }
}
