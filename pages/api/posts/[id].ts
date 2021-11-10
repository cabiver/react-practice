import type { NextApiRequest, NextApiResponse } from 'next'
// import { connectToDatabase } from '../../../utility Functions/mongoDB'
// import { v4 } from 'uuid'
// import path from 'path'
// const pages = path.join(__dirname, '../../../posting/')

type Data = {
  mensaje: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    console.log(req)
    // const { db } = await connectToDatabase()
    // const user = await db.collection('usuarios').findOne({
    //   usuari: req.query.id
    // })
    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    //   res.status(205).send({ mensaje: `No files were uploaded. ${req.file}` })
    //   return
    // }
    // const imagen = req.files.image
    // if (!user) {
    //   res.status(205).send({ mensaje: 'no se ah encontrado el usuario' })
    //   return
    // }
    // const desc = Date() + '█ ' + req.body.description
    // const nombreimagen = v4() + imagen.name
    // const postImg = 'temp/' + nombreimagen
    // imagen.name = nombreimagen
    // imagen.mv(path.join(pages, postImg), (err:any) => {
    //   if (err) {
    //     return res.status(402)
    //   }
    // })
    // await db.collection('usuarios').updateOne({ usuari: user.usuari }, { $push: { post: { $each: [{ postImg, desc }], $position: 0 } } })
    res.status(200).send({ mensaje: 'all great' })
  }
}
