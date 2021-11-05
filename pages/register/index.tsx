import { useRef, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import style from '@styles/register/style.module.css'

function RegisterPage() {
  const form = useRef<HTMLFormElement>(null)
  const [requestMessege, setRequestMessege] = useState('')

  const check = (error: Array<any>) => {
    if (error[0]) {
      setRequestMessege(error[1])
    } else {
      setRequestMessege('request send')
    }
  }
  const validartodo = (text: string, cant: any) => {
    const error = []
    const valido = document.getElementById(text) as HTMLInputElement;
    if (!valido) {
      return
    }
    const vuelvaARellenar = validarLimpieza(valido.value)

    if (!vuelvaARellenar) {
      error[0] = true
      error[1] = "remove the symbols like that: '#'%'&'/')"
      return error
    }
    // console.log(valido.value.length , cant)
    // console.log(text)
    if (valido.value.length < cant) {
      error[0] = true
      if (text === 'password') {
        error[1] = 'the password must have 8 character or more'
      } else {
        error[1] = 'the usuari should have more than 5 character'
      }
    } else error[0] = false
    return error
  }
  const validarLimpieza = (textClear: string) => {
    let valor = true
    for (let i = 0; i < (textClear.length - 1); i++) {
      const letra = textClear[i]
      if (letra === '/') valor = false
      if (letra === '%') valor = false
      if (letra === '!') valor = false
      if (letra === String.fromCharCode(92)) valor = false
      if (letra === '$') valor = false
      if (letra === '{') valor = false
      if (letra === '}') valor = false
      if (letra === ':') valor = false
      if (letra === '=') valor = false
    }
    return valor
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!form.current) {
      return
    }
    const Form = new FormData(form.current)
    // console.log(Form.get('password'))
    // console.log(Form.get('password-again'))

    if (Form.get('password') !== Form.get('password-again')) {
      setRequestMessege("the passwords don't match")
      return
    }


    let error = validartodo('js_register.js-validar_el_nombre_de_usuario', 5)
    if (error == undefined) {
      return
    }
    check(error)

    if (!error[0]) {
      error = validartodo('password', 8)
      if (error == undefined) {
        return
      }

      check(error)
      if (!error[0]) {

        const respuesta = await axios.post('/register', {
          uss: Form.get('user'),
          contra: Form.get('password')
        })
        console.log(respuesta)
        if (respuesta.statusText === 'OK') {

          setRequestMessege(respuesta.data.mensage)
          // console.log('entre aqui')

          if (respuesta.data.metodo) {
            document.cookie = 'token=' + respuesta.data.token
            document.cookie = 'userName=' + respuesta.data.nombre

            const urlNombre = respuesta.data.nombre.replaceAll(' ', '%20')
            window.location.assign('/' + urlNombre)
          }
        } else {
          console.log(respuesta)
        }
      }
    }
  }

  return (

    <div className={style.center}>
      <form onSubmit={handleSubmit} className={style.form} ref={form} action="" method="POST">
        <h1 >Registrate</h1>
        <label htmlFor="js_register.js-validar_el_nombre_de_usuario" >nombre de usuario: </label>
        <input type="text" name="user" id="js_register.js-validar_el_nombre_de_usuario" placeholder="usuari123" />
        <label className="negrillas" htmlFor="password" >contraseña: </label>
        <div className="relative">
          <input className="border__input border__input--left" type="password" name="password" id="password" placeholder="password" />
          <Image priority src="/images/eyeball-icon-png-eye-icon-1.png" alt="me" height="20" width="20" />

        </div>
        <label className="negrillas" htmlFor="js_register.js-validar_el_nombre_de_usuario" >otra vez la contraseña: </label>
        <input className="border__input" type="password" name="password-again" placeholder="password again" />
        <input className="border__send" id="js_register.js-boton_event_submit" type="submit" value="register" />
        <div className="negrillas" dangerouslySetInnerHTML={{ __html: requestMessege }}></div>
      </form>
    </div>

  )
}
export default RegisterPage