import React  from "react"
import "../../css/navegacion.css"
import"../../css/buscador.css"

export default function ErrorPagina(props) {
    
        return (
        <header id="Header">
            <div className="cabecera" id="Mains.js-calcular_y_asignar_width_a_la_cabecera_y_detectar_click">
                <div id="Mains.js-calcular_distancia_y_esperar_click">
                    <div className="separadorDeCabecera" id="iconoDeLaPagina">
                        <img className="icono js-detectar_cuando_carge" src="images/camille-300x300.png" alt=""/>
                    </div>
                </div>
                <div id="Mains.js-referencia_para_calcular_la_pocision_de_la_lupa-barra_de_busqueda-div_barra_busqueda">
                    <form className="barraDeBusqueda" id="Mains.js-variable_para_el_posicionamiento_de_la_lupa-form_busqueda">
                        <input className="inputs-text-sin-mamadas div-dentro-de-barra-de-busqueda" id="Mains.js-variable_de_posicionamiento" autoComplete="off" name="usuarios" action="" type="text"/>
                        <button className="fit-height"  id="Main.js-posicionar_la_lupa">
                            <img className="icono-lupa" id="lupa" src="images/lupa.png" alt=""/>
                        </button>
                    </form>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div className="divRecomiendaciones" id="Mains.js cuentas.js-posicionamiento_y_actualizacion_de_peticiones_de_recomendados"></div>
                    </div>
                </div>
                <div className="div-perfil-tuyo" id="Mains.js-div_de_tu_perfil_para_ajustar_barra_de_busqueda">
                    <div className="separadorDeCabecera div-icono-de-usuario" id="Mains.js-agregar_eventos_que_desplegue_opciones_de_usuarios">
                        <div className="MainsJS-arrays_de_iconos_para_volverlos_cuadrados iconPerfil">
                            <img className="iconoPrincipal"  src="images/camille-300x300.png" alt=""/>
                        </div>
                        <div className="nombre">
                            carlos
                        </div>
                    </div>
                </div>        
            </div>
            <div className="Flex-navegador-user" id="Mains.js-pesplegar-opciones-de-sesion" style={{display: "none"}}>
                <button className="p-de-navegador" id="Mains.js-detectar-click-ir-a-tu-sitio-web">Ir a mi sitio web</button>
                <button className="p-de-navegador" id="Mains.js-detectar-click-eliminar-cookies">cerrar Sesion</button>
            </div>
    </header>
    )
}