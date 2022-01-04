import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
import USER_SCHEME from '../../../models/usariname'

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
    await connectToDatabase()
    const user = await USER_SCHEME.findOne({
      usuari: req.query.id
    })
    if (!user) {
      res.status(203).send({ mensaje: 'url de imagen y icono enviada', background: null, icon: null, exist: false })
      return
    }
    res.send({ mensaje: 'url de imagen y icono enviada', background: user.background, icon: user.icon, exist: true })
  }
}
