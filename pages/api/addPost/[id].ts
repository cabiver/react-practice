import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
import { verificacion } from '../../../utility Functions/verifiCookies'
import { v4 as uuidv4 } from 'uuid'

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
const saveFile = async (fileDirTempleta:any, fileName: any) => {
  console.log(fileDirTempleta)
  // const url = new URL(file.filepath)
  // console.log(file.filepath)

  const data :Buffer = fs.readFileSync(fileDirTempleta)
  // console.log(data)
  await fs.writeFileSync(`./public/posts/${fileName}`, data)
  // const resultado = await fs.writeFileSync(`../../../public/${file.originalFilename}`, data)
  // console.log(resultado)
  // await fs.unlinkSync(file.path)
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // console.log(req.body)
    // console.log(req)
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
      res.status(404).send({ mensaje: 'no se ah encontrado el usuario' })
      return
    }
    // const imagen = req.files.image
    // if (user._id !== objetoVerificacion.decodedToken.id) {
    //   res.status(400).json({ mesage: 'usted no tiene permitido cambiar ni agregar nada a esta cuenta' })
    //   return
    // }
    if (!user) {
      res.status(404).send({ mensaje: 'no se ah encontrado el usuario' })
    }
    const form = new formidable.IncomingForm()
    // console.log(form)
    form.parse(req, async function (_err: any, fields: any, files: any) {
    // console.log(files.image.filepath)
    // console.log(fields)
      const desc = Date() + '█ ' + fields.description
      const nombreimagen = uuidv4() + files.image.originalFilename
      const postImg = `/posts/${nombreimagen}`
      await saveFile(files.image.filepath, nombreimagen)
      await db.collection('usuarios').updateOne({ usuari: user.usuari }, { $push: { post: { $each: [{ postImg, desc }], $position: 0 } } })
      // console.log(files.image.filepath)
      // return { image: files.image, body: fields }
    })
  }
}
