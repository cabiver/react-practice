import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
import USER_SCHEME from '../../../models/usariname'

type Data = {
  mensaje: string
    content:any
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
    // console.log(user)
    if (!user) {
      res.status(201).send({ mensaje: 'fail', content: null })
      return
    }

    const op = req.body
    const arrayPost = user.post.slice(op.cont, op.cont + 3)
    if (arrayPost == null) {
      res.send({ mensaje: 'url de imagen y icono enviada', content: null })
      return
    }
    // console.log(user)
    res.send({ mensaje: 'url de imagen y icono enviada', content: arrayPost })
  }
}
