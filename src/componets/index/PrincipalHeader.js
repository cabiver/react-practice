import React,{useEffect} from "react";
import axios from "axios";
import "./style.css"
export default function PaginaPrincipal() {
    let create = false;

    const handleResize = ()=>{
        
        const fix = document.getElementById("responsive_index.js-la_cabecera_para_ajustarla");
        const background = document.getElementById("responsive-index.js-detectar_cuando_carge_y_posicionar_objetos");
        const botonSesion = document.getElementById("responsive_indexjs,code.js-posicionar_y_agregar_eventos");
        
        fix.style.width =`${document.body.offsetWidth }px`;
        botonSesion.style.marginRight =`${((document.body.offsetWidth - background.clientWidth) /2)+3}px`;
        
    }
    const handleLoad = ()=>{
        
        const fix = document.getElementById("responsive_index.js-la_cabecera_para_ajustarla");
        const background = document.getElementById("responsive-index.js-detectar_cuando_carge_y_posicionar_objetos");
        const botonSesion = document.getElementById("responsive_indexjs,code.js-posicionar_y_agregar_eventos");

        fix.style.width =`${document.body.offsetWidth }px`;
        botonSesion.style.marginRight =`${((document.body.offsetWidth - background.clientWidth) /2)+3}px`;
        
    }
    const handleClickSession = (e)=>{
        const sesion = document.getElementById("responsive_index.js,code.js-pocisionamineto_y_eventos_con_la_ventana");
        
        if(create){
            create= false;
            sesion.classList.remove("pestana");
            sesion.classList.add("hidden");
        }else{
            sesion.classList.remove("hidden");
            sesion.classList.add("pestana");
            create = true;
        }
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
        if(autorizar) {
            document.cookie = "userName="+token;
            window.location.reload();
        }else{
            resultado.innerHTML = mensaje;
        }
    }else{
        resultado.innerHTML = "contraseña o usuario incorrecto";
    }
    }
    useEffect(() => {
        window.addEventListener("load",handleLoad);
        window.addEventListener("resize",handleResize);
    }, []);
    return (
        <>
            <div id="responsive_index.js-contenedor_de_todo_y_comparador_para_operaciones" className="all">
                <header>
                    <div id="responsive_index.js-la_cabecera_para_ajustarla" className="fix">
                        <div className="marHeader">
                            <div id="responsive_index.js-ajustar_width_de_la_cabecera" className="iniciar">
                                <div id="responsive_indexjs,code.js-posicionar_y_agregar_eventos" onClick={handleClickSession} className="feedback white backzero">login</div>
                            </div>
                        </div>
                        <div id="responsive_index.js,code.js-pocisionamineto_y_eventos_con_la_ventana" className="hidden">
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
            </div>


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