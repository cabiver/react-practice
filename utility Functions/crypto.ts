
import { getCipher, getDeCipher } from './ciphers'

export function encrypted (message: string) {
  const cipher = getCipher()

  let encryptedData = cipher.update(message, 'utf-8', 'hex')
  encryptedData += cipher.final('hex')
  return encryptedData
}
export function descrypted (encryptedData: string) {
  const decipher = getDeCipher()

  let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8')
  decryptedData += decipher.final('utf-8')
  return decryptedData
}
