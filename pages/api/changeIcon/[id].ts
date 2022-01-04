import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from 'utility Functions/mongoDB'
import { v4 as uuidv4 } from 'uuid'
import formidable from 'formidable'
import fs from 'fs'
import USER_SCHEME from '../../../models/usariname'

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
  await fs.writeFileSync(`./public/icons/${fileName}`, data)
  // const resultado = await fs.writeFileSync(`../../../public/${file.originalFilename}`, data)
  // console.log(resultado)
  // await fs.unlinkSync(file.path)
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

    const form = new formidable.IncomingForm()
    // console.log(form)
    form.parse(req, async function (_err: any, fields: any, files: any) {
    // console.log(files.image.filepath)
    // console.log(fields)
      const nombreimagen = uuidv4() + files.image.originalFilename
      const postImg = `/icons/${nombreimagen}`
      await saveFile(files.image.filepath, nombreimagen)
      await USER_SCHEME.updateOne({ usuari: user.usuari }, { $set: { icon: postImg } })
      // console.log(nombreimagen)
      // return { image: files.image, body: fields }
    })
    res.send({ mensaje: 'all rigth' })
  }
}
