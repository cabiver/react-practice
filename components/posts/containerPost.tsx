import style from '@styles/componets/posts/post_component.module.css'
const ConteinerPost = ({ url, mesage, fecha }:any) => {
  return (
    <>
    <div className={style.posts__Container}>
      <div>
        <p>
          {fecha}
        </p>
        <div className={style.flexGrow}>

        </div>
      </div>
      <div>
        <p>
          {mesage}
        </p>
        <img src={url} alt="" />
      </div>
    </div>
    </>
  )
}
export default ConteinerPost
