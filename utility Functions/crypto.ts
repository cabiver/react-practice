import { createCipheriv, randomBytes, createDecipheriv } from 'crypto'
const algorithm = 'aes-256-cbc'

// generate 16 bytes of random data
const initVector = randomBytes(16)

// secret key generate 32 bytes of random data
const Securitykey = randomBytes(32)

// the cipher function
const cipher = createCipheriv(algorithm, Securitykey, initVector)
const decipher = createDecipheriv(algorithm, Securitykey, initVector)
// decipher.setAutoPadding(false)

export function encrypted (message: string) {
  let encryptedData = cipher.update(message, 'utf-8', 'binary')

  console.log(encryptedData)
  encryptedData += cipher.final('binary')
  console.log('encrypto : ', encryptedData)
  console.log('password : ', message)
  return encryptedData
}
export function descrypted (encryptedData: any) {
  console.log(encryptedData)
  console.log('1')
  let decryptedData = decipher.update(encryptedData, 'binary', 'utf-8')
  console.log('2')
  console.log(decryptedData)
  decryptedData += decipher.final('utf-8')
  console.log('3')
  console.log('Decrypted message: ' + decryptedData)
  return decryptedData
}
