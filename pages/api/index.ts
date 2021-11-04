// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import userScheme from "../../models/usariname"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
const youKnow = "iLovePlayMinecraftForEver";
const MONGODB_URI :string |undefined = process.env.MONGODB_URI
type Data = {
  metodo: boolean,
  mensaje: string
  token: any | null
  nombre: string | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST'){
    // console.log('entre a la peticion principal')
    // console.log(MONGODB_URI)
    // console.log(mongoose.model('usuarios')) 

    if(!MONGODB_URI){
      return
    }
    await mongoose.connect(MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true})  
    let op = req.body;
    if (!op.uss || !op.contra) {
      res.status(400).json({
        metodo:false,
        mensaje: "porque modificas mi codigo",
        token: null,
        nombre:null
      })
      return
    }
  const primer = new userScheme({
    usuari: op.uss,
    password: op.contra
  });
  const user = await userScheme.findOne({ 
    usuari: primer.usuari 
  });
  
  // mongoose.connection.close();
  if (user) {
    if (await bcrypt.compare(primer.password, user.password)) {
      const token = jwt.sign({
        id: user._id,
        usuariname: user.usuari,
        icon: user.icon,
      }, youKnow);
      res.json({ 
        metodo: true, 
        token: token,
        mensaje: "todo bien",
        nombre: user.usuari,
      });
      return;
    }
  }
    res.status(203).json({
        metodo: false,
        token:null,
        mensaje: "su contraseña o usuario esta mal",
        nombre: null
      });
    return;
  }
}
