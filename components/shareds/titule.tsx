import style from '@styles/principalPage/titule.module.css'

function Titule (props: any) {
  return (<>
        <div className={ `${props.margin ? style.titule_center__margin : ''} ${style.titule_center} `}>
            <div className={
              `${props.absolute ? style.titule_container__absolute : ''} ${style.titule_container} `
              }>
                <div className={style.titule__text}>{props.mensage}</div>

            </div>
        </div>

        </>
  )
}
export default Titule
