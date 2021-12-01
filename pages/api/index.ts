// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import USER_SCHEME from '../../models/usariname'
import jwt from 'jsonwebtoken'
import { descrypted } from '../../utility Functions/crypto'
import { connectToDatabase } from '../../utility Functions/mongoDB'
const youKnow :string |undefined = process.env.YOU_KNOW
type Data = {
  metodo: boolean,
  mensaje: string
  token: any | null
  nombre: string | null
  background : string | null
  icon: string | null
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    if (!youKnow) {
      return
    }
    const op = req.body
    if (!op.uss || !op.contra) {
      res.status(400).json({
        metodo: false,
        mensaje: 'porque modificas mi codigo',
        token: null,
        nombre: null,
        background: null,
        icon: null
      })
      return
    }
    const { db } = await connectToDatabase()

    if (!db) {
      return
    }
    const primer = new USER_SCHEME({
      usuari: op.uss,
      password: op.contra
    })
    const user = await db.collection('usuarios').findOne({
      usuari: primer.usuari
    })

    if (user) {
      if (descrypted(user.password) === op.contra) {
        const token = jwt.sign({
          id: user._id,
          usuariname: user.usuari,
          icon: user.icon
        }, youKnow)
        res.json({
          metodo: true,
          token: token,
          mensaje: 'todo bien',
          nombre: user.usuari,
          background: user.background,
          icon: user.icon
        })
        return
      }
    }
    res.status(203).json({
      metodo: false,
      token: null,
      mensaje: 'su contraseña o usuario esta mal',
      nombre: null,
      background: null,
      icon: null
    })
  }
}
