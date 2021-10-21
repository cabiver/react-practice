import React, {useEffect} from "react"
import Header from "./componets/Header"
import BackGround from "./componets/BackGround"

import "../../servis/variables.css"
import"../../servis/center.css"
import"../../servis/normalize.css"
import"../../servis/flexbox.css"
import"../css/cuentas-css.css"
import"../css/imagenes.css"
import"../css/userController.css"
import"../css/ventanaDePost.css"
import"../css/vistaDePost.css"
import"../css/portadaUsuario.css"
import"../css/responsiveAllCuentas.css"

export default function MyAccount(props) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "js/responsive-cuentas.js";
        script.async = true;
        document.body.appendChild(script);
    },[]);
    
    return (
    <>
        <Header></Header>
        <BackGround></BackGround>
    </>
    )
}