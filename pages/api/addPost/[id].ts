import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
import { verificacion } from '../../../utility Functions/verifiCookies'
import { v4 as uuidv4 } from 'uuid'
import USER_SCHEME from '../../../models/usariname'
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
  const data :Buffer = fs.readFileSync(fileDirTempleta)
  await fs.writeFileSync(`./public/posts/${fileName}`, data)
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
      res.status(404).send({ mensaje: 'no se ah encontrado el usuario' })
      return
    }
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
    const form = new formidable.IncomingForm()
    form.parse(req, async function (_err: any, fields: any, files: any) {
      const desc = Date() + '█ ' + fields.description
      const stringRandom = uuidv4()
      const nombreimagen = stringRandom + files.image.originalFilename
      const postImg = `/posts/${nombreimagen}`
      await saveFile(files.image.filepath, nombreimagen)
      await USER_SCHEME.updateOne({ usuari: user.usuari }, { $push: { post: { $each: [{ idPost: stringRandom, postImg, desc, likes: [], coments: [] }], $position: 0 } } })
      // return { image: files.image, body: fields }
    })
    res.status(200).send({ mensaje: 'fue agregado existosamnete' })
  }
}
