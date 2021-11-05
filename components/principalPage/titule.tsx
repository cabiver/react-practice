import style from '@styles/principalPage/titule.module.css'

function Titule(){
    return(<>
        <div className={style.titule_center}>
            <div className={style.titule_container}>
                <div className={style.titule_shadow}></div>
                <div className={style.titule__text}>mi pagina para probar mi forntend y backend</div>

            </div>
        </div>

        </>
    )
}
export default Titule