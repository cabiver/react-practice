import React , { useEffect } from "react"
import "./register.css"
import "../servis/eye.css"
import axios from 'axios'

export default function ErrorPagina(props) {

    const check = (error) => {
        if (error[0]) {
          document.getElementById('js_register-informar_usuario_de_la_peticion').innerHTML = error[1]
        } else {
          document.getElementById('js_register-informar_usuario_de_la_peticion').innerHTML = 'request send'
        }
      }
      const validartodo = (text, cant) => {
        const error = []
        const valido = document.getElementById(text)
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
      const validarLimpieza = (textClear) => {
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
      
      const handleSubmit= async (e) => {
        e.preventDefault()
        const Form = new FormData(document.getElementById('js_register.js-tener elemento form'))
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
              document.getElementById('js_register-informar_usuario_de_la_peticion').innerHTML = respuesta.data.mensage
              if (respuesta.data.metodo) {
                document.cookie = 'userName=' + respuesta.data.token
                const urlNombre = respuesta.data.nombre.replaceAll(' ', '%20')
                window.location.assign('/' + urlNombre)
              }
            } else {
              console.log(respuesta)
            }
          }
        }
      }
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "js/see.js";
        script.async = true;
        document.getElementById('registers').appendChild(script);
    },[]);
    
    return (
        
        <div id="registers" className="borde register-body">
                <div  className="border__margin-form-center">        
                    <form onSubmit={handleSubmit} className="border__form" id="js_register.js-tener elemento form" action="" method="POST">
                        <div className="titule cente negrillas">Registrate</div>
                        <label className="negrillas" htmlFor="js_register.js-validar_el_nombre_de_usuario" >nombre de usuario: </label>
                        <input className="border__input" type="text" name="usuario" id="js_register.js-validar_el_nombre_de_usuario" placeholder="usuari123"/>
                        <label className="negrillas" htmlFor="password" >contraseña: </label>
                        <div className="relative">
                            <input className="border__input border__input--left" type="password" name="password" id="see.js code.js responsive_index.js-cambiar_a_visible" placeholder="password"/>
                            <img id="see.js-servicio_de_visualizador_de_password" className="eye" src="images/eyeball-icon-png-eye-icon-1.png" alt=""/>
                        </div>
                        <label className="negrillas" htmlFor="js_register.js-validar_el_nombre_de_usuario" >otra vez la contraseña: </label>
                            <input className="border__input" type="password" name="password-again" placeholder="password again"/>
                        <input className="border__send" id="js_register.js-boton_event_submit" type="submit" value="register"/>
                        <label className="negrillas" id= "js_register-informar_usuario_de_la_peticion"></label>
                    </form>
                </div>
        </div>
    )
}