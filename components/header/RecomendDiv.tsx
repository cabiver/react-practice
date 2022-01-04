import style from '@styles/principalPage/header.module.css'

const RecomendContainer = ({ name } : any) => {
  return (
        <div className={style.recomend_component}>
            {name}
        </div>
  )
}

export default RecomendContainer
