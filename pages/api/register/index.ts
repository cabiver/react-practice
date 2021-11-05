import type { NextApiRequest, NextApiResponse } from 'next'
import USER_SCHEME from '../../../models/usariname'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
const youKnow :string |undefined = process.env.YOU_KNOW
const MONGODB_URI :string |undefined = process.env.MONGODB_URI
const baseHash = 24
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
  // if (req.method === 'POST') {
  //   if (!MONGODB_URI || !youKnow) {
  //     console.log("you don't have the env variables")
  //     return
  //   }
  //   await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  //   const op = req.body
  //   if (!op.uss || !op.contra) {
  //     res.status(400).send({ token: null, nombre: null, mensaje: 'que haces cambiando mi codigo?', metodo: false })
  //     return
  //   }
  //   const user = await USER_SCHEME.findOne({ usuari: op.uss })
  //   if (user) {
  //     res.send({ token: null, nombre: null, metodo: false, mensaje: 'Este usuario ya existe' })
  //   }
  //   const salt = bcrypt.genSaltSync(baseHash)
  //   const passHash = bcrypt.hashSync(op.contra, salt)
  //   const primer = new USER_SCHEME({
  //     usuari: op.uss,
  //     password: passHash
  //   })
  //   const userNew = await primer.save()
  //   const token = await jwt.sign({ id: userNew._id, usuariname: userNew.usuari, icon: userNew.icon }, youKnow)
  //   mongoose.connection.close()
  //   res.send({
  //     metodo: true,
  //     mensaje: 'se ha guardado su usuario',
  //     nombre: userNew.usuari,
  //     token: token
  //   })
  // }
}
