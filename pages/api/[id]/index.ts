import type { NextApiRequest, NextApiResponse } from 'next'
import USER_SCHEME from '../../../models/usariname'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
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
    const { db } = await connectToDatabase()
    const user = await db.collection('usuarios').findOne({
      usuari: req.query.id
    })
    // const user = await USER_SCHEME.findOne({
    //   usuari: req.query.id
    // })
    if (!user) {
      res.status(401)
    }
    // console.log(user)
    res.send({ mensaje: 'url de imagen y icono enviada', background: user.background, icon: user.icon })
  }
}
