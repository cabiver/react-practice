// require("@babel/register")({
//   presets:["@babel/preset-react"]
// });

const path = require("path");
const Router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cookieNPM = require("cookie");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const bcrypt = require("bcrypt");
const youKnow = "iLovePlayMinecraftForEver";
const pages = path.join(__dirname, "/../public/");
const baseHash = 10;
const model = require("../usariname.js");

ffmpeg.setFfmpegPath(ffmpegPath);


function verificacion(cookie) {
  let jsoncookie = cookieNPM.parse(cookie);
  if (!jsoncookie.userName || jsoncookie.userName == "undefined" || jsoncookie.userName.length == 0) {
    return { metodo: false };
  }
  const token = jsoncookie.userName
  const decodedToken = jwt.verify(token, youKnow);
  if (!decodedToken.id) {
    return { metodo: false };
  } else {
    return { metodo: true, decodedToken };
  }
}

Router.get("/api/data", (req, res) => {
  res.json({estatus:"ok",name:"carlos"})
})

Router.post("/", async (req, res) => {
  let op = req.body;
  if (!op.uss || !op.contra) {
    res.status(400).json({ mensaje: "porque modificas mi codigo" })
    return
  }
  let primer = new model({
    usuari: op.uss,
    password: op.contra,
  });
  let user = await model.findOne({ usuari: primer.usuari });
  if (user) {
    if (await bcrypt.compare(primer.password, user.password)) {
      const token = jwt.sign({
        id: user._id,
        usuariname: user.usuari,
        icon: user.icon,
      }, youKnow);
      res.json({ metodo: true, token: token });
      return;
    }
  }
  res.status(203).json({ metodo: false, mensaje: "su contraseña o usuario esta mal" });
  return;
});
Router.post("/ultimaBusqueda", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "/html/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }

  let user = await model.findOne({ _id: objetoVerificacion.decodedToken.id });
  res.send(JSON.stringify(user.ultimasBusquedas));
  res.end();

});
Router.post("/register", async (req, res) => {
  let op = req.body;
  if (!op.uss || !op.contra) {
    res.status(400).send("que haces cambiando mi codigo?");
    return;
  }
  const user = await model.findOne({ usuari: op.uss });
  if (user) {
    res.send({ metodo: false, mensage: "Este usuario ya existe" });
  }
  const salt = bcrypt.genSaltSync(baseHash);
  const passHash = bcrypt.hashSync(op.contra, salt);
  let primer = new model({
    usuari: op.uss,
    password: passHash
  })
  const userNew = await primer.save();
  const token = await jwt.sign({ id: userNew._id, usuariname: userNew.usuari, icon: userNew.icon }, youKnow);
  res.send({
    metodo: true, mensage: "se ha guardado su usuario",
    nombre: userNew.usuari,
    token: token
  });
  return;
});
Router.post("/cuentas/:id", async (req, res) => {
  let op = req.body;
  const user = await model.findOne({ usuari: req.params.id });
  if (!user || req.params.id == "") {
    return res.status(404).send(pages + "/html/error.html")
  }
  arrayPost = user.post.slice(op.cont, op.cont + 3);
  if (arrayPost == null) {
    res.send(JSON.stringify({ post: null }));
    return;
  }
  let primer = {
      content: arrayPost,
  };
  res.send(JSON.stringify(primer));
  res.end();
});
Router.post("/imagenes/:id", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "/html/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res.status(400).send("No files were uploaded." + req.file);
    return;
  }
  const imagen = req.files.image;
  const user = await model.findOne({ usuari: req.params.id });
  if (user._id != objetoVerificacion.decodedToken.id) {
    res.status(400).json({ mesage: "usted no tiene permitido cambiar ni agregar nada a esta cuenta" });
    return;
  }
  if (!user) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  let desc = Date() + "█ " + req.body.description;
  let nombreimagen = uuidv4() + imagen.name;
  let postImg = "temp/" + nombreimagen;
  imagen.name = nombreimagen;
  imagen.mv(path.join(pages, postImg), err => {
    if (err) {
      return res.status(402);
    }
  });
  await model.updateOne({ usuari: user.usuari }, { $push: { post: { $each: [{postImg,desc}], $position: 0 } } })
  res.status(200).send("all great");
});
Router.post("/perfilIcon/:id", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  cookie = req.headers.cookie;
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res.status(400).json({ mensage: "No files were uploaded." });
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  const user = await model.findOne({ usuari: req.params.id });
  if (!user || user._id != objetoVerificacion.decodedToken.id) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  cookie = req.headers.cookie;
  jsoncookie = cookieNPM.parse(cookie);
  const token = jsoncookie.userName
  const decodedToken = jwt.verify(token, youKnow);
  if (user._id != decodedToken.id) {
    res.status(400).json({ mesage: "usted no tiene permitido cambiar ni agregar nada a esta cuenta" });
    return;
  }
  imagen = req.files.image
  let nombreimagen = uuidv4() + imagen.name;
  nomebreimagen = nombreimagen.replace('"', "")
  let postImg = "iconos/" + nombreimagen;
  imagen.name = nombreimagen;
  imagen.mv(path.join(pages, postImg), err => {
    if (err) {
      return res.status(402);
    }
  });
  await model.updateOne({ usuari: user.usuari }, { icon: "/" + postImg });
  res.status(200).send("all great");
});
Router.post("/background/:id", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    res.status(400).json({ mensage: "No files were uploaded." });
    return;
  }
  const user = await model.findOne({ usuari: req.params.id });
  if (!user) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  if (user._id != objetoVerificacion.decodedToken.id) {
    res.status(400).json({ mesage: "usted no tiene permitido cambiar ni agregar nada a esta cuenta" });
    return;
  }
  imagen = req.files.image
  let nombreimagen = uuidv4() + imagen.name;
  nomebreimagen = nombreimagen.replace('"', "");
  let postImg = "backgrounds/" + nombreimagen;
  arrayBackground = nombreimagen.split(".");
  let nombreSinExtencion = "";
  if (arrayBackground.length.length > 2) {
    for (let index = 0; index < arrayBackground.length - 2; index++) {
      nombreSinExtencion += arrayBackground.length[index]
    }
  } else {
    nombreSinExtencion = arrayBackground[0]
  }
  extencion = arrayBackground[arrayBackground.length - 1];
  imagen.name = nombreimagen;
  imagen.mv(path.join(pages, postImg), err => {
    if (err) {
      return res.status(402);
    }
  });
  let difuminado = `backgroundDifuminado/${nombreSinExtencion}.jpg`
  if (extencion == "mp4" || extencion == "avi") {
    ffmpeg({ source: path.join(pages, postImg) })
      .takeScreenshots({ filename: `${nombreSinExtencion}.jpg`, timemarks: [0] }, pages + "/backgroundDifuminado");
    await model.updateOne({ usuari: user.usuari }, { background: "/" + postImg });
    await model.updateOne({ usuari: user.usuari }, { backgroundDifumidado: "/" + difuminado });
  } else {
    await model.updateOne({ usuari: user.usuari }, { background: "/" + postImg });
    await model.updateOne({ usuari: user.usuari }, { backgroundDifumidado: "/" + postImg });
  }
  res.status(200).send("all great");
});
Router.post("/buscar", async (req, res) => {
  let op = req.body;
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  if (!op.usuarios) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }

  const userPerfil = await model.findOne({ usuari: op.usuarios });
  if (!userPerfil) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  let user = await model.findOne({ _id: objetoVerificacion.decodedToken.id });

  if(user.usuari == op.usuarios){
    res.json({ pagina: "/" + user.usuari });
    return;
  }
  let maxUltimosBuscados=5;
  let noExisteEsaBusqueda = true;
  let arrayConservador = []
  user.ultimasBusquedas.forEach((elemet,indice) => {
    if (elemet == op.usuarios) {
      noExisteEsaBusqueda = false;
    } else {
      if(indice<maxUltimosBuscados){
        arrayConservador = [...arrayConservador, elemet];
      }
    }
  });
  
    await model.updateMany({ _id: objetoVerificacion.decodedToken.id }, {
      "ultimasBusquedas": [op.usuarios,...arrayConservador],
    });
  
  res.json({ pagina: "/" + userPerfil.usuari });
});
Router.post("/miSitio", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  const user = await model.findOne({ _id: objetoVerificacion.decodedToken.id });
  if (!user) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  res.json({ pagina: "/" + user.usuari })
});
Router.post("/deleteimagen/:id", async (req, res) => {
  let op = req.body;
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario");
    return;
  }
  const user = await model.findOne({ usuari: req.params.id });
  if (!user || user._id != objetoVerificacion.decodedToken.id) {
    res.status(404).send("no se ah encontrado el usuario");
    return;
  }
  
  fs.unlinkSync(path.join(pages, op.parametros));
  await model.updateMany({ usuari: user.usuari }, { $pull: { "post": {postImg: op.parametros} } });
  res.status(200).send("all great");
});
Router.post("/recomendacion", async (req, res) => {
  let op = req.body;
  let users = await model.find({ usuari: { $regex: `${op.usuarios}` } }, { usuari: 1, _id: 0 }).limit(4);
  let arrayUsers = [];
  users.forEach(element => {
    arrayUsers.push(element.usuari);
  })
  res.status(200).json({ nombres: arrayUsers });
});
Router.post("/UltimosPost", async (req, res) => {
  let op = req.body;
  cookie = req.headers.cookie;
  if (!cookie) {
    res.status(401).render(pages + "html/servis/401NoAutorizacion.html");
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  const user = await model.findOne({ _id: objetoVerificacion.decodedToken.id });
  if (!user) {
    res.status(404).send("no se ah encontrado el usuario")
    return;
  }
  if (!op.amigosVisitados) {
    res.status(404).send("deja de meterte con mi codigo")
    return;
  }

  let numeroPost = 15;
  let postMandar = [];
  let arrayAmigos = op.amigosVisitados;
  let nuevoAmigosVisitados = [];
  for (let i = 0; i <= user.ultimasBusquedas.length - 1 && numeroPost > 0; i++) {
    let userAmigo = await model.findOne({ usuari: user.ultimasBusquedas[i] });
    let existeAmigo = false;
    arrayAmigos.forEach(el => {
      if (el.nombre == userAmigo.usuari) {
        existeAmigo = true;
        return;
      }
    });

    if (userAmigo) {
      if (!existeAmigo) {
        nuevoAmigosVisitados = [...nuevoAmigosVisitados, userAmigo.usuari];
        arrayAmigos = [...arrayAmigos, { nombre: userAmigo.usuari, contador: 0 }]
      }
      arrayAmigos.forEach((el, index) => {
        if (el.nombre == userAmigo.usuari) {
          if (userAmigo.post[el.contador]) {
            postMandar = [...postMandar, {
              nombre: userAmigo.usuari,
              post: userAmigo.post[el.contador],
              icon: userAmigo.icon,
            }];
            arrayAmigos[index].contador = arrayAmigos[index].contador + 1;
          }
        }

      });

    }
    numeroPost--;
  }
  for (let i = 0; numeroPost > 0; numeroPost--) {
    
    let random = Math.round(Math.random() * (user.amigos.length - 1));
    let userAmigo = await model.findOne({ _id: user.amigos[random] });
    let existeAmigo = false;
    arrayAmigos.forEach(el => {
      if (el.nombre == userAmigo.usuari) {
        existeAmigo = true;
        return;
      }
    });
    if (userAmigo) {
      if (!existeAmigo) {
        nuevoAmigosVisitados = [...nuevoAmigosVisitados, userAmigo.usuari];
        arrayAmigos = [...arrayAmigos, { nombre: userAmigo.usuari, contador: 0 }]
      }
      arrayAmigos.forEach((el, index) => {
        if (el.nombre == userAmigo.usuari) {
          if (userAmigo.post[el.contador]) {
            postMandar = [...postMandar, {
              nombre: userAmigo.usuari,
              post: userAmigo.post[el.contador],
              icon: userAmigo.icon,
            }];
            arrayAmigos[index].contador = arrayAmigos[index].contador + 1;
          }
        }
      });
    }
  }
  res.status(200).json({ amigos: postMandar, nuevoAmigosVisitados, arrayAmigos })
});
Router.post("/:id", async (req, res) => {
  cookie = req.headers.cookie;
  if (!cookie) {
    res.render(path.join(pages, "html/pagina_principal/index.html"))
    return;
  }
  let objetoVerificacion = verificacion(cookie);
  if (!objetoVerificacion.metodo) {
    res.render(path.join(pages, "html/pagina_principal/index.html"))
    return;
  }
  let nombreAmigo = req.params.id.replaceAll("%20", " ");
  let user = await model.findOne({ usuari: objetoVerificacion.decodedToken.usuariname });
  let userAmigo = await model.findOne({ usuari: nombreAmigo });
  if (!userAmigo) {
    res.status(400).send("que shinga me mandaste?");
    return;
  }
  let amigo = false;
  user.amigos.forEach(el => {
    if (el == `${userAmigo._id}`) {
      amigo = true;
      return;
    }
  });
  if (amigo) {
    await model.updateMany({ usuari: user.usuari }, { $pullAll: { amigos: [userAmigo._id] } });
  } else {
    await model.updateOne({ usuari: user.usuari }, { $push: { amigos: { $each: [userAmigo._id], $position: 0 } } })
  }
  res.json(objetoVerificacion);
});
module.exports = Router;