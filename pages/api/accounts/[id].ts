import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
import USER_SCHEME from '../../../models/usariname'
import { verificacion } from '../../../utility Functions/verifiCookies'

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

    const cookie = req.headers.cookie
    if (!cookie) {
      res.status(401)
      return
    }
    const objetoVerificacion = verificacion(cookie)
    if (!objetoVerificacion.metodo) {
      res.status(404).send({ mensaje: 'fail in yours cookies', content: null })
      return
    }

    const op = req.body
    const arrayPost = user.post.slice(op.cont, op.cont + 3)
    arrayPost.forEach((element:any, index:any) => {
      arrayPost[index].liked = element.likes.includes(objetoVerificacion.decodedToken.usuariname)
    })
    // console.log(objetoVerificacion.decodedToken.usuariname)
    // console.log(arrayPost[0])
    // console.log(arrayPost[1])
    if (arrayPost == null) {
      res.send({ mensaje: 'url de imagen y icono enviada', content: null })
      return
    }
    // console.log(user)
    res.send({ mensaje: 'url de imagen y icono enviada', content: arrayPost })
  }
}
