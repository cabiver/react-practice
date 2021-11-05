import mongoose, { Schema, model } from 'mongoose'

const usuari = new Schema({
  usuari: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: new Date() },
  background: { type: String, default: 'images/background.jpg' },
  backgroundDifumidado: { type: String, default: 'images/background.jpg' },
  icon: { type: String, default: 'images/camille-300x300.png' },
  amigos: { type: [], default: [] },
  ultimasBusquedas: { type: [], default: [] },
  post: []
})
export default mongoose.models.usuarios || model('usuarios', usuari)
