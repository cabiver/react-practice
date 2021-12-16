import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
type Data = {
  mensaje: string
  background : string | null
  icon: string | null
  exist: boolean
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
    // console.log(user)
    if (!user) {
      res.status(203).send({ mensaje: 'url de imagen y icono enviada', background: null, icon: null, exist: false })
      return
    }
    res.send({ mensaje: 'url de imagen y icono enviada', background: user.background, icon: user.icon, exist: true })
  }
}
