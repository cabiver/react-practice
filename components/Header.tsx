import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@styles/principalPage/header.module.css'
import styleInput from '@styles/servis/inputs.module.css'
import axios from 'axios'
import { changePassword } from '../utility Functions/changePassword'

const Header = () => {
  const router = useRouter()
  const PrincipalHeader = useRef<HTMLDivElement>(null)
  const marginHeader = useRef<HTMLDivElement>(null)
  const session = useRef<HTMLFormElement>(null)
  const [create, setCreate] = useState(false)
  const [requestMessege, setRequestMessege] = useState('')
  const [visiblePass, setVisiblePass] = useState(true)
  const handelPassword = () => {
    setVisiblePass((e) => !e)
    changePassword('header-password', visiblePass)
  }
  const handleClickSession = () => {
    setCreate(exist => !exist)
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const { id }:string = router.query
    if (!session?.current) {
      return
    }
    const Form = new FormData(session.current)

    if (!Form.get('uss')) {
      // console.log(Form.get('uss'))
      return
    }
    setRequestMessege('cargando')
    if (id === Form.get('uss')) {
      console.log('genius, you have ben in your session')
      return
    }
    const respuesta = await axios.post('/api/', {
      uss: Form.get('uss'),
      contra: Form.get('contra')
    })
    console.log(respuesta)
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
      } else {
        setRequestMessege(mensaje)
      }
    } else {
      setRequestMessege('contraseña o usuario incorrecto')
    }
  }
  useEffect(() => {
    if (!session.current) {
      return
    }
    session.current.style.display = create ? '' : 'none'
  }, [create, router])
  useEffect(() => {
    // if (!marginHeader.current) {
    //   return
    // }
    marginHeader.current?.style.height = `${PrincipalHeader.current?.clientHeight}px`
  }, [PrincipalHeader, marginHeader])

  return (
            <>
            <div ref={PrincipalHeader} className={styles.header}>
                    <div className={styles.nav}>
                        <div onClick={handleClickSession} className={styles.header__container__button}>
                            <div className={styles.header__button}>login</div>
                        </div>
                    </div>

                    <div >
                        <form ref={session} className={styles.window_session} onSubmit={(e) => handleSubmit(e)} action="" >
                                <label>usuari</label>
                                <input name="uss" type="text" className={styleInput.input} />

                                <label className="cente">contraseña</label>
                                <div className={styleInput.input_password}>
                                    <input id="header-password" name="contra" type="password" className={styleInput.input} />
                                    <div className={styleInput.see}>
                                      <i onClick={() => handelPassword()} className="fas fa-eye"/>
                                    </div>

                                </div>
                                <input type="submit" className={styleInput.button_send} value="sign in"/>
                                <label dangerouslySetInnerHTML={{ __html: requestMessege }}></label>
                        </form>
                    </div>

            </div>
        <div ref={marginHeader}></div>

    </>
  )
}
export default Header
