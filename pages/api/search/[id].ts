import type { NextApiRequest, NextApiResponse } from 'next'
// import { verificacion } from '../../../utility Functions/verifiCookies'
import { connectToDatabase } from '../../../utility Functions/mongoDB'
import model from '../../../models/usariname'

type Data = {
    metodo: boolean
    friends: Array<string> | null
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { client } = await connectToDatabase()
  const users = await client.collection('usuarios').find({ usuari: { $regex: `${req.query.id}` } })
  console.log(users)
  // await connectToDatabase()
  if (req.method === 'GET') {
    // const users = await model.find({ usuari: { $regex: `${req.query.id}` } })
    const arrayUsers: Array<string> = []
    // console.log(users)
    // console.log(users.topology.s.options)
    // console.log(users.topology)
    // users.forEach((element : any) => {
    //   arrayUsers.push(element.usuari)
    // })

    res.status(200).json({ metodo: true, friends: arrayUsers })
  }
}

// const op = req.body

//     const cookie = req.headers.cookie
//     // console.log(cookie)
//     if (!cookie) {
//       res.status(401)
//       return
//     }
//     const objetoVerificacion = verificacion(cookie)
//     // console.log(objetoVerificacion)
//     if (!objetoVerificacion.metodo) {
//       res.status(404).send({ metodo: false, mensaje: null, friends: null })
//       return
//     }
//     const { db } = await connectToDatabase()
//     const userPerfil = await db.collection('usuarios').findOne({
//       usuari: req.query.id
//     })
//     if (!userPerfil) {
//         res.status(404).send({ metodo: false, mensaje: null, friends: null })
//         return
//     }
//     const user = await db.collection('usuarios').findOne({ _id: objetoVerificacion.decodedToken.id })

//     // if (user.usuari === op.usuarios) {
//     //     res.json({ pagina: '/' + user.usuari })
//     //     return
//     // }
//     const maxUltimosBuscados = 5
//     let noExisteEsaBusqueda = true
//     let arrayConservador:any = []
//     let sum = 0
//     user.ultimasBusquedas.forEach((elemet, indice) => {
//         if (elemet === op.usuarios) {
//         noExisteEsaBusqueda = false
//         } else {
//           if (indice < maxUltimosBuscados) {
//               arrayConservador = [...arrayConservador, elemet]
//           }
//         }
//     })

//     await model.updateMany({ _id: objetoVerificacion.decodedToken.id }, {
//         ultimasBusquedas: [op.usuarios, ...arrayConservador]
//     })

//     res.json({ pagina: '/' + userPerfil.usuari })
