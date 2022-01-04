import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
import USER_SCHEME from '../../../models/usariname'

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
    if (!req.body.namePost || !req.body.idPost) {
      res.status(201).send({ mensaje: 'fail', content: null })
      return
    }
    const result = await USER_SCHEME.findOne({ usuari: req.body.namePost, 'post.idPost': req.body.idPost })
    // console.log(result)
    if (!result.post) {
      return
    }
    result.post.forEach((element: any) => {
      if (element.idPost === req.body.idPost) {
        console.log(element)
      }
    })
    // , { $push: { post: { $each: [user.usari], $position: 0 } } }
    res.send({ mensaje: 'set likes', content: user.usari })
  }
}
