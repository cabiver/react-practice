import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
import { verificacion } from '../../../utility Functions/verifiCookies'

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
const post = async (req: any) => {
  const form = new formidable.IncomingForm()
  // console.log(form)
  const inf = form.parse(req, async function (_err: any, fields: any, files: any) {
    // console.log(files.image.filepath)
    // console.log(fields)
    await saveFile(files.image)
    return { image: files.image, body: fields }
  })
  return inf
}
const saveFile = async (file:any) => {
  // console.log(file.filepath
  // const url = new URL(file.filepath)
  // console.log(file.filepath)

  const data :Buffer = fs.readFileSync(file.filepath)
  console.log(data)
  const resultado = await fs.writeFileSync(`./public/posts/${file.originalFilename}`, data)
  // const resultado = await fs.writeFileSync(`../../../public/${file.originalFilename}`, data)
  console.log(resultado)
  // await fs.unlinkSync(file.path)
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // console.log(req.body)
    // console.log(req)
    const inf = post(req)
    const { db } = await connectToDatabase()
    const user = await db.collection('usuarios').findOne({
      usuari: req.query.id
    })
    const cookie = req.headers.cookie
    if (!cookie) {
      res.status(401)
      return
    }
    const objetoVerificacion = verificacion(cookie)
    if (!objetoVerificacion.metodo) {
      res.status(404).send('no se ah encontrado el usuario')
      return
    }
    // const imagen = req.files.image
    // if (user._id !== objetoVerificacion.decodedToken.id) {
    //   res.status(400).json({ mesage: 'usted no tiene permitido cambiar ni agregar nada a esta cuenta' })
    //   return
    // }
    if (!user) {
      res.status(404).send('no se ah encontrado el usuario')
    }
    console.log(inf)
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
