import React,{useEffect, useRef, useState} from "react";
import axios from "axios";
import "../style.css";
import "../../servis/eye.css";
export default function PaginaHeader() {
    
    const session = useRef()
    const [create,setCreate] = useState(true)
    
    const handleClickSession = (e)=>{
        setCreate(exist => !exist)
    }
    const handleSubmit = async (e)=>{
    
        e.preventDefault();
        const resultado=document.getElementById("code.js-informar_usuario_de_la_peticion");
        const contra= document.getElementById("see.js code.js responsive_index.js-cambiar_a_visible");
        const usuariName= document.getElementById("code.js-captar_datos_nombre_de_usuario");
    
        resultado.innerHTML = "cargando";

        let respuesta = await axios.post("/",  {
            uss: usuariName.value,
            contra: contra.value
        })
        if(respuesta.statusText === "OK"){
            let autorizar = respuesta.data.metodo;
            let mensaje = respuesta.data.mensaje;
            let token = respuesta.data.token;
            console.log(respuesta)
            if(autorizar) {
                document.cookie = "token="+token;
                document.cookie = "userName="+ respuesta.data.nombre
                // window.location.reload();
            }else{
                resultado.innerHTML = mensaje;
            }
        }else{
            resultado.innerHTML = "contraseña o usuario incorrecto";
        }
    }
    useEffect(()=>{
        if(create){
            session.current.classList.remove("pestana");
            session.current.classList.add("hidden");
        }else{
            session.current.classList.remove("hidden");
            session.current.classList.add("pestana");
        }
    },[create])
    return (
        <>
                <header className="principal-header">
                    <div className="fix header_fix">
                        <div className="marHeader">
                            <div id="responsive_index.js-ajustar_width_de_la_cabecera" className="iniciar">
                                <div id="responsive_indexjs,code.js-posicionar_y_agregar_eventos" onClick={handleClickSession} className="feedback white backzero">login</div>
                            </div>
                        </div>
                        <div ref={session}>
                            <div className="margin_sign">
                                <form onSubmit={(e)=>{handleSubmit(e)}} action="" className="from-login">
                                    <label>usuari</label>
                                    <div id="flexContra" className="flexPassword">
                                        <input id="code.js-captar_datos_nombre_de_usuario" type="text" className="aspect" />
                                    </div>
                                    <label className="cente">contraseña</label>
                                    <div id="flexContra" className="flexPassword">
                                        <input id="see.js code.js responsive_index.js-cambiar_a_visible" type="password" className="aspect" />
                                        <img id="see.js-servicio_de_visualizador_de_password" className="eye" src="images/eyeball-icon-png-eye-icon-1.png" alt="" />

                                    </div>
                                    <input id="code.js-boton_event_submit" type="submit" className="send" value="sign in" />
                                    <label id="code.js-informar_usuario_de_la_peticion" className="negrillas"></label>
                                </form>
                            </div>
                        </div>
                    </div>
                </header>

            <div className="full">

                <div className="botonMarco">
                    <div className="boton feedback_boton">
                        <a href="register" className="white"><b>registrarse</b></a>
                    </div>

                </div>

                <div className="stuffed">
                    <img id="responsive-index.js-detectar_cuando_carge_y_posicionar_objetos" src="images/background.jpg" alt="" />
                </div>

            </div>
        </>
    )
}