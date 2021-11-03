import style from '@styles/principalPage/text.module.css'
function Text (){
    return(<>
    
        <div className={style.titule_container}>
            <h2 className={style.titule__text}>mi pagina para probar mi forntend y backend</h2>
        </div>
        <div className={style.text_area}>
        <p>la pagina consiste en hacer un login que pueda guardar fotos, para empezar no sabia js, y sabia que
            era HTML y CSS pero nunca lo habia puesto en practica</p>
                <br/>
            <p>este es mi primer intento de una pagina con fondtend y backend, en la cual consistira en crear un usario y contraseña para poder acceder a tu html donde guardaras imagenes</p>
            <p>aca pondre todo lo que este haciendo desde entonces</p>
        </div>
        </>
    )
}
export default Text