const cookieNPM = require('cookie')
const jwt = require('jsonwebtoken')
const youKnow :string |undefined = process.env.YOU_KNOW

export function verificacion (cookie:String) {
  const jsoncookie = cookieNPM.parse(cookie)
  if (!jsoncookie.token || jsoncookie.token === undefined || jsoncookie.token.length === 0) {
    return { metodo: false }
  }
  const token = jsoncookie.token
  const decodedToken = jwt.verify(token, youKnow)
  if (!decodedToken.id) {
    return { metodo: false }
  } else {
    return { metodo: true, decodedToken }
  }
}
