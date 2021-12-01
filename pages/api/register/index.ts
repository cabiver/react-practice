import type { NextApiRequest, NextApiResponse } from 'next'
import USER_SCHEME from '../../../models/usariname'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
import { encrypted } from '../../../utility Functions/crypto'

import jwt from 'jsonwebtoken'

const youKnow :string |undefined = process.env.YOU_KNOW
const MONGODB_URI :string |undefined = process.env.MONGODB_URI

type Data = {
    metodo: boolean
  mensaje: string
  token: string | null
  nombre: string | null
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    if (!MONGODB_URI || !youKnow) {
      console.log("you don't have the env variables")
      return
    }
    const op = req.body
    if (!op.uss || !op.contra) {
      res.status(400).send({ token: null, nombre: null, mensaje: 'que haces cambiando mi codigo?', metodo: false })
      return
    }
    const { db } = await connectToDatabase()
    const user = await db.collection('usuarios').findOne({
      usuari: op.uss
    })
    // const user = await USER_SCHEME.findOne({ usuari: op.uss })
    if (user) {
      res.send({ token: null, nombre: null, metodo: false, mensaje: 'Este usuario ya existe' })
      return
    }
    const primer = new USER_SCHEME({
      usuari: op.uss,
      password: encrypted(op.contra)
    })

    // console.log(primer)
    const userNew = await db.collection('usuarios').insertOne(primer)
    const token = await jwt.sign({ id: userNew._id, usuariname: userNew.usuari, icon: userNew.icon }, youKnow)
    res.send({
      metodo: true,
      mensaje: 'se ha guardado su usuario',
      // nombre: userNew.usuari,
      nombre: primer.usuari,
      token: token
    })
  }
}
