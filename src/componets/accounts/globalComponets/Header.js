import React, { useState }  from "react"
import "../css/navegacion.css"
import "../css/buscador.css"
import Cookies from 'js-cookie'
import { useEffect, useRef } from "react/cjs/react.development"

export default function ErrorPagina(props) {
    const [visibleOption,setVisibleOption] = useState(false)
    const windowOption = useRef()
    
    useEffect(()=>{
        if(visibleOption){
            windowOption.current.style.display = ""
        }else {
            windowOption.current.style.display = "none"
        }
        
    },[visibleOption])
    const handelClickOption = (e)=>{
        setVisibleOption(visible=>!visible)
    }

    return (
        <header id="Header">
            <div className="cabecera" id="Mains.js-calcular_y_asignar_width_a_la_cabecera_y_detectar_click">
                <div id="Mains.js-calcular_distancia_y_esperar_click">
                    <div className="separadorDeCabecera" id="iconoDeLaPagina">
                        <img className="icono js-detectar_cuando_carge" src="images/camille-300x300.png" alt=""/>
                    </div>
                </div>
                <div className="barraDeBusqueda__div">
                    <form className="barraDeBusqueda" id="Mains.js-variable_para_el_posicionamiento_de_la_lupa-form_busqueda">
                        <input className="inputs-text-sin-mamadas div-dentro-de-barra-de-busqueda" id="Mains.js-variable_de_posicionamiento" autoComplete="off" name="usuarios" action="" type="text"/>
                        <button className="fit-height barraDeBusqueda__lupa">
                            <img className="icono-lupa" id="lupa" src="images/lupa.png" alt=""/>
                        </button>
                    </form>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div className="divRecomiendaciones" id="Mains.js cuentas.js-posicionamiento_y_actualizacion_de_peticiones_de_recomendados"></div>
                    </div>
                </div>
                <div className="div-perfil-tuyo" onClick={handelClickOption}>
                    <div className="separadorDeCabecera div-icono-de-usuario">
                        <div className="MainsJS-arrays_de_iconos_para_volverlos_cuadrados iconPerfil">
                            <img className="iconoPrincipal"  src="images/camille-300x300.png" alt=""/>
                        </div>
                        <div className="nombre">
                            {Cookies.get('userName')}
                        </div>
                    </div>
                </div>        
            </div>
            <div className="Flex-navegador-user" ref={windowOption}>
                <button className="p-de-navegador" >Ir a mi sitio web</button>
                <button className="p-de-navegador" >cerrar Sesion</button>
            </div>
        </header>
    )
}