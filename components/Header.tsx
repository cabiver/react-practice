import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@styles/principalPage/header.module.css'
import styleInput from '@styles/servis/inputs.module.css'
import RecomendDiv from './header/RecomendDiv'
import axios from 'axios'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { changePassword } from '../utility Functions/changePassword'

const Header = () => {
  const [logged, setLogged] = useState(false)
  const [iconSession, setIconSession] = useState(Cookies.get('icon'))
  const [nameSession, setNameSession] = useState(Cookies.get('userName'))
  const router = useRouter()
  const PrincipalHeader = useRef<HTMLDivElement>(null)
  const marginHeader = useRef<HTMLDivElement>(null)
  const formSearch = useRef<HTMLFormElement>(null)
  const session = useRef<HTMLFormElement>(null)
  const [create, setCreate] = useState(false)
  const [requestMessege, setRequestMessege] = useState('')
  const [visiblePass, setVisiblePass] = useState(true)
  const [recomend, setRecomend] = useState<Array<any> | null>(null)
  const handelPassword = () => {
    setVisiblePass((e) => !e)
    changePassword('header-password', visiblePass)
  }
  const handelChangeSearch = async (e:any) => {
    if (!formSearch.current) {
      return
    }
    if (e.target.value === '') {
      setRecomend(null)
      return
    }
    const request = await axios.get(`/api/search/${e.target.value}`)
    console.log(request.data.peaple)
    setRecomend(e => request.data.peaple)
  }
  const handelSignOut = () => {
    Cookies.remove('token')
    window.location.assign('/')
  }
  const handleClickSession = () => {
    setCreate(exist => !exist)
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // const { id }: any = router.query
    if (!session?.current) {
      return
    }
    const Form = new FormData(session.current)

    if (!Form.get('uss')) {
      // console.log(Form.get('uss'))
      return
    }
    setRequestMessege('cargando')
    if (Cookies.get('token')) {
      console.log('genius, you have ben in your session')
      return
    }
    const respuesta = await axios.post('/api/', {
      uss: Form.get('uss'),
      contra: Form.get('contra')
    })
    // console.log(respuesta)
    if (respuesta.statusText === 'OK') {
      const autorizar = respuesta.data.metodo
      const mensaje = respuesta.data.mensaje
      const token = respuesta.data.token

      if (autorizar) {
        document.cookie = 'token=' + token
        document.cookie = 'userName=' + respuesta.data.nombre
        document.cookie = 'icon=' + respuesta.data.icon
        document.cookie = 'background=' + respuesta.data.background
        router.push(`/${Form.get('uss')}`)
        setIconSession(respuesta.data.icon)
        setNameSession(respuesta.data.nombre)
        setLogged(true)
      } else {
        setRequestMessege(mensaje)
      }
    } else {
      setRequestMessege('contraseña o usuario incorrecto')
    }
  }
  useEffect(() => {
    if (!marginHeader.current) {
      return
    }
    marginHeader.current.style.height = `${PrincipalHeader.current?.clientHeight}px`
  }, [PrincipalHeader.current?.clientHeight, marginHeader])
  useEffect(() => {
    // console.log(logged)
    if (!Cookies.get('token')) {
      return
    }
    setLogged(true)
  }, [logged])
  return (
    <>
      <div ref={PrincipalHeader} className={styles.header}>

        {logged
          ? <div className={styles.nav}>
            <div>
              <Image className={styles.header__icon}
                src="/images/camille-300x300.png" alt=""
                width="50"
                height="50"/>
            </div>
            <div className={styles.divContaine_search}>
              <form ref={ formSearch } className={ `${styles.header__search_container} ${recomend ? styles.recomend_container__show_recomend : null}`} action="">
                <input onChange={(e) => handelChangeSearch(e)} className={styleInput.input} name='name' type="text" placeholder='search' autoComplete='off'/>
                <button className={`fas fa-search ${styles.header__i_search}`}></button>
              </form>
                {
                  !recomend
                    ? null
                    : <div className={ styles.recomend_container }>
                      {recomend.map((e:string, index: any) => <RecomendDiv key={index} name={e}/>)}
                    </div>
                }
            </div>
          <div onClick={handleClickSession} className={styles.header__container__button}>
            <div className={styles.header__session_login}>
              <div className={styles.header__userName}>
                {nameSession}
              </div>
              {
                iconSession
                  ? <Image
                  className={styles.header__icon}
                  src={iconSession}
                  width="50"
                  height="50"
                  alt="yo que se"
                  priority={true}>
                </Image>
                  : null
              }
            </div>
        </div>
      </div>
          : <div className={styles.nav}>
          <div></div>
          <div onClick={handleClickSession} className={styles.header__container__button}>
            <div className={styles.header__button}>login</div>
          </div>
        </div>
          }
        <div style={{ display: create ? '' : 'none' }}>
          {logged
            ? <div className={styles.window_session}>
            <div onClick={handelSignOut} className={styles.window_button_option}>
              sign out
            </div>
          </div>
            : <form ref={session} className={styles.window_session} onSubmit={(e) => handleSubmit(e)} action="" >
              <label>usuari</label>
              <input name="uss" type="text" className={styleInput.input} />

              <label className="cente">contraseña</label>
              <div className={styleInput.input_password}>
                <input id="header-password" name="contra" type="password" className={styleInput.input} />
                <div className={styleInput.see}>
                  <i onClick={() => handelPassword()} className="fas fa-eye" />
                </div>

              </div>
              <input type="submit" className={styleInput.button_send} value="sign in" />
              <label dangerouslySetInnerHTML={{ __html: requestMessege }}></label>
            </form>
          }

        </div>

      </div>
      <div ref={marginHeader}></div>

    </>
  )
}
export default Header
