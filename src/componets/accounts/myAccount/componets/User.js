import React from "react"
import "../../css/navegacion.css"
import "../../css/buscador.css"

export default function User(props) {

    return (
        <>
            <div id="" className="FLEXperfilUser containerUser">
                <div className="FLEXBOX ALIGN-ITEMS boxUser">
                    <div className="divIconPerfil"
                        id="Main-cuentas.js-operador_para_posicionar_la_camara-icono">
                        <div className="icono-press iconPerfil MainsJS-arrays_de_iconos_para_volverlos_cuadrados">
                            <img className="iconoPrincipal" src="images/camille-300x300.png" alt="" />

                        </div>
                        <div className="divrCamaraIcono" id="Main-cuentas.js-para_posicionar_la_camara_del_background">
                            <div className="divrCamaraIcono--div-background" id="Main-cuentas.js-comparador_de_tamaño_para_posicionarlo">
                                <div className="divrCamaraIcono__plus-camara-div">
                                    <img className="divrCamaraIcono__img" src="images/mas.png" alt="" />
                                </div>
                                <div className="camara-background feedCamara">
                                    <img className="imagen-de-camara" id="changeBackground" src="images/camara.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="perfilName">
                        {/* <%= user %> */} cabiver
                    </div>
                </div>
            </div><form className="superponer text-claro change-icon" action="" style={{ display: "none" }}
                id="main-cuentas.js-htmlFormulario_para_cambiar_icono">
                <div className="flexCenter">
                    <input style={{ display: "none" }} id="iconImag" name="image" type="file" />
                    <label className="text-change-icon " htmlFor="">quieres cambiar el icono de tu perfil?</label>
                    <label className="buttonLable" htmlFor="iconImag">subir icono</label>
                    <img className="renderIcono" id="main-cuentas-js-renderizar-icono" src="" alt="" />
                    <label className="resultIcono" id="resultIcono" htmlFor=""></label>
                    <button className="enviarIcon ">enviar icono</button>
                </div>
            </form>
        </>
    )
}

