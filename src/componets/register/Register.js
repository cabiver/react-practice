import React , { useEffect } from "react"
import "./register.css"
export default function ErrorPagina(props) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "js/see.js";
        script.async = true;
        document.getElementById('registers').appendChild(script);
    },[]);
    
    return (
        <div id="registers" className="borde">
                <div  className="border__margin-form-center">        
                    <form className="border__form" id="js_register.js-tener elemento form" action="" method="POST">
                        <div className="titule cente negrillas">Registrate</div>
                        <label className="negrillas" htmlFor="js_register.js-validar_el_nombre_de_usuario" >nombre de usuario: </label>
                        <input className="border__input" type="text" name="usuario" id="js_register.js-validar_el_nombre_de_usuario" placeholder="usuari123"/>
                        <label className="negrillas" htmlFor="password" >contraseña: </label>
                        <div>
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