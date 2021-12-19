
import Image from 'next/image'
import Posts from './addMorePosts'
import style from '@styles/account/principal_account.module.css'
import styleInput from '@styles/servis/inputs.module.css'

function AccountExist ({ background, icon, name } :any) {
  return (
  <>
    {
      background
        ? <>

        <div className={style.background_container}>
          <div className={style.background_difuminado}>
            <Image
            src={background}
            width="2688"
            height="1512"
            alt="persona 5 difuminado"
            priority
            />
          </div>
          <div className={'body-responsive'}>
            <Image
            src={background}
            width="2688"
            height="1512"
            layout="responsive"
            alt="persona 5"
            priority>
            </Image>
          </div>

        </div>

      </>
        : <div>
        loading
      </div>
    }
    <div>
      <div className={style.user_container}>
        <div className={style.user_div}>
          {
            icon
              ? <Image src={icon} alt=""
                width='60' height='60'/>
              : <div> loading </div>
          }
          <div>
            {name}
          </div>
        </div>
      </div>
    </div>
    <form className={`${styleInput.form_container} ${styleInput.form_container___w40}`} action="" id="usuario_controller.js-formulario_para_cambiar_icono">
      <input id="iconImag" name="image" type="file" style={{ display: 'none' }}/>
      <label htmlFor="">do you wanna change you icon?</label>
      <label htmlFor="iconImag" className={styleInput.form__button}>upload img</label>
      <img id="renderIcono" src="" alt=""/>
      <label id="resultIcono" className="resultIcono" htmlFor=""></label>
      <button className={styleInput.form__button}>enviar icono</button>
    </form>

    <Posts></Posts>
  </>
  )
}

export default AccountExist
