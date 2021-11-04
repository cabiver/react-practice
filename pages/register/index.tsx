import { useRef } from 'react'
import Image from 'next/image'
import axios from 'axios'
import style from '@styles/register/style.module.css'

function RegisterPage (){
    const request = useRef<HTMLLabelElement>(null)
    const form = useRef<HTMLFormElement>(null)
    const check = (error : any) => {
        if(!request){
            return
        }
        if (error[0]) {
          request.innerHTML = error[1]
        } else {
          request.innerHTML = 'request send'
        }
    }
      const validartodo = (text:any, cant:any) => {
        const error = []
        const valido : HTMLInputElement = document.getElementById(text)
        const vuelvaARellenar = validarLimpieza(valido.value)
      
        if (!vuelvaARellenar) {
          error[0] = true
          error[1] = "quite los simbolos raros al usuario o al password Ejemplo: '#'%'&'/')"
          return error
        }
        if (valido.value.length < cant) {
          error[0] = true
          if (text === 'password') {
            error[1] = 'the password must to have 8 character or more'
          } else {
            error[1] = 'the usuari don´t have more 5 character'
          }
        } else error[0] = false
        return error
      }
      const validarLimpieza = (textClear : string) => {
        let valor = true
        for (let i = 0; i < (textClear.length - 1); i++) {
          const letra = textClear[i]
          if (letra === '/')valor = false
          if (letra === '%')valor = false
          if (letra === '!')valor = false
          if (letra === String.fromCharCode(92))valor = false
          if (letra === '$')valor = false
          if (letra === '{')valor = false
          if (letra === '}')valor = false
          if (letra === ':')valor = false
          if (letra === '=')valor = false
        }
        return valor
      }
      
      const handleSubmit= async (e : any) => {
        e.preventDefault()
        const Form = new FormData( form )
        if (Form.get('password') !== Form.get('password-again')) {
          return
        }
        let error = validartodo('js_register.js-validar_el_nombre_de_usuario', 5)
        check(error)
        if (!error[0]) {
          error = validartodo('see.js code.js responsive_index.js-cambiar_a_visible', 8)
          check(error)
          if (!error[0]) {
            const respuesta = await axios.post('/register', {
              uss: Form.get('usuario'),
              contra: Form.get('password')
            })
            if (respuesta.statusText === 'OK') {
              request?.innerHTML = respuesta.data.mensage
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
        
                <div  className={style.center}>        
                    <form onSubmit={handleSubmit} className={style.form} ref={ form } action="" method="POST">
                        <div className="titule cente negrillas">Registrate</div>
                        <label className="negrillas" htmlFor="js_register.js-validar_el_nombre_de_usuario" >nombre de usuario: </label>
                        <input className="border__input" type="text" name="usuario" id="js_register.js-validar_el_nombre_de_usuario" placeholder="usuari123"/>
                        <label className="negrillas" htmlFor="password" >contraseña: </label>
                        <div className="relative">
                            <input className="border__input border__input--left" type="password" name="password" id="see.js code.js responsive_index.js-cambiar_a_visible" placeholder="password"/>
                            <Image priority src="/images/eyeball-icon-png-eye-icon-1.png" alt="me" height="20" width="20"/>
          
                        </div>
                        <label className="negrillas" htmlFor="js_register.js-validar_el_nombre_de_usuario" >otra vez la contraseña: </label>
                            <input className="border__input" type="password" name="password-again" placeholder="password again"/>
                        <input className="border__send" id="js_register.js-boton_event_submit" type="submit" value="register"/>
                        <label className="negrillas" ref={ request }></label>
                    </form>
                </div>
        
    )
}
export default RegisterPage