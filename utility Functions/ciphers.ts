import { createCipheriv, createDecipheriv } from 'crypto'
const algorithm = 'aes-256-cbc'

const initVector = process.env.IV
const Securitykey = process.env.KEY

let cipher:any = null
let decipher:any = null
const messageError = 'please, give me de key an iv'

export function getCipher () {
  // if (cipher) {
  //   return cipher
  // }
  if (!initVector || !Securitykey) {
    throw new Error(messageError)
  }
  cipher = createCipheriv(algorithm, Securitykey, initVector)
  return cipher
}
export function getDeCipher () {
  // if (decipher) {
  //   return decipher
  // }
  if (!initVector || !Securitykey) {
    throw new Error(messageError)
  }
  decipher = createDecipheriv(algorithm, Securitykey, initVector)
  return decipher
}
