import type { NextApiRequest, NextApiResponse } from 'next'
// import { connectToDatabase } from '../../../utility Functions/mongoDB'
// import { verificacion } from '../../../utility Functions/verifiCookies'

import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false
  }
}

type Data = {
  mensaje: string
}
const post = async (req: any, res: any) => {
  const form = new formidable.IncomingForm()
  form.parse(req, async function (err: any, fields: any, files: any) {
    console.log(files)
    await saveFile(files)
    return res.status(201).send('')
  })
}
const saveFile = async (file:any) => {
  console.log(file)
  // const data = fs.readFileSync(file.path)
  fs.writeFileSync(`../../../public/posts/${file.originalFilename}`, file)
  // await fs.unlinkSync(file.path)
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // console.log(req.body)
    post(req, res)
    // const { db } = await connectToDatabase()
    // const user = await db.collection('usuarios').findOne({
    //   usuari: req.query.id
    // })
    // const cookie = req.headers.cookie
    // if (!cookie) {
    //   res.status(401)
    //   return
    // }
    // const objetoVerificacion = verificacion(cookie)
    // if (!objetoVerificacion.metodo) {
    //   res.status(404).send('no se ah encontrado el usuario')
    //   return
    // }
    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    //   res.status(400).send('No files were uploaded.' + req.file)
    //   return
    // }
    // const imagen = req.files.image
    // if (user._id !== objetoVerificacion.decodedToken.id) {
    //   res.status(400).json({ mesage: 'usted no tiene permitido cambiar ni agregar nada a esta cuenta' })
    //   return
    // }
    // if (!user) {
    //   res.status(404).send('no se ah encontrado el usuario')
    //   return
    // }
    // const desc = Date() + '█ ' + req.body.description
    // const nombreimagen = uuidv4() + imagen.name
    // const postImg = 'temp/' + nombreimagen
    // imagen.name = nombreimagen
    // imagen.mv(path.join(pages, postImg), err => {
    //   if (err) {
    //     return res.status(402)
    //   }
    // })
    // await model.updateOne({ usuari: user.usuari }, { $push: { post: { $each: [{ postImg, desc }], $position: 0 } } })
    // res.status(200).send('all great')
  }
}
