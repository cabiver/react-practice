import React from "react"
import "../servis/normalize.css"
import "../servis/center.css"
import "../servis/error.css"
export default function ErrorPagina(props) {
    return (
        <div className="contenedor">
            <div className="separador">
                <h1>error 404</h1>
                <h2>la pagina no se ah encontrado</h2>
            </div>
            <img className="knucles" src="/images/knucles_new.png" alt="" />
        </div>

    )
}