import React, { useEffect } from "react"
import "../../css/navegacion.css"
import "../../css/buscador.css"
import axios from "axios"
export default function User(props) {
    
    const form = document.getElementById('main-cuentas.js-formulario_subir_post')
    let file    

    function validar () {
        let validar = true
        const formdata = new FormData(form)
        if (!file) {
          file = formdata.get('image')
        }
        const text = formdata.get('description')
        if (file.size === 0) {
          validar = false
          return validar
        }
        if (text.length >= 150) {
          validar = false
          return validar
        }
        if (text === '') {
          validar = true
        }
        return validar
      }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if (validar()) {
          const formdata = new FormData(form)
          formdata.delete('image')
          formdata.append('image', file)
          const respuesta = await axios.post('/imagenes' + window.location.pathname, formdata)
          if (respuesta.statusText === 'OK') {
            window.location.reload()
          } else {
            console.log(respuesta)
          }
        }
    }
    useEffect(()=>{

    })
    return (
        // <div className="bak" id="full">
            <>
            <div className="FLEXBOX JUSTIFY-CONTENT">

                <div className="container">
                    <form onSubmit={handleSubmit} id="main-cuentas.js-formulario_subir_post" className="form-img" encType="multipart/form-data">
                        <input style={{display: "none"}} id="imgFile" type="file" name="image" />
                        <label className="buttonLable " htmlFor="imgFile">sube una imagen</label>
                        <div className="load-imge" id="main-cuentas.js-div_renderisa_pre_prost">
                            <div id="barra-de-carga"></div>
                            <video className="render-de-video pc" id="loadVideo" src=""></video>
                            <img className="render-de-imagen precentacion image pc" id="main-cuentas.js-imagen_para_renderiar" src="" alt="" />
                        </div>
                        <video id="loadVideoMobile" className="render-de-video-mobile" src=""></video>
                        <img id="imagMobile" src="" alt="" className="render-de-image-mobile image mobile" />

                        <p className="INLINE-BLOC">agrega una description</p>
                        <input className="desc" autoComplete="off" type="text" name="description" />
                        <button className="sendbutton">subir Post</button>
                    </form>

                </div>
            </div>

            <div className="marco" id="Mains.js-div-donde-colocaras-los-post">

            </div>
            <div className="FLEXBOX JUSTIFY-CONTENT">
                <div className="div-para-marco FLEXBOX ALIGN-ITEMS" id="mains.js-limite-fotos" style={{display: "none"}}>
                    <p className=" fuente">ya no hay mas fotos?</p>
                </div>
            </div>
        </>
    )
}
