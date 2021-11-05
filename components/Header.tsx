import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '@styles/principalPage/header.module.css'
import axios from "axios"

const Header = ()=>{
    const router = useRouter()
    const session = useRef<HTMLFormElement>(null)
    const [create,setCreate] = useState(false)
    const [requestMessege, setRequestMessege] = useState('') 
    
    const handleClickSession = ()=>{
        setCreate(exist => !exist)
    }
    const handleSubmit = async (e:any)=>{
        e.preventDefault();        
        if(!session?.current){
            return
        }
        const Form = new FormData( session.current )
        setRequestMessege("cargando")
        let respuesta = await axios.post("/api/",  {
            uss: Form.get('uss'),
            contra: Form.get('contra')
        })
        console.log(respuesta)
        if(respuesta.statusText === "OK"){
            let autorizar = respuesta.data.metodo;
            let mensaje = respuesta.data.mensaje;
            let token = respuesta.data.token;
            
            if(autorizar) {
                document.cookie = "token="+token;
                document.cookie = "userName="+ respuesta.data.nombre
                router.push(`/${Form.get('uss')}`)
            }else{
                setRequestMessege(mensaje)
            }
        }else{
            setRequestMessege("contraseña o usuario incorrecto")
        }
    }
    useEffect(()=>{
        if(!session.current){
            return
        }
        session.current.style.display = create?'':'none';
    },[create])
    
    return (
            <>
            <header className={styles.header}>
                    <div className={styles.nav}>
                        <div onClick={handleClickSession} className={styles.header__container__button}>
                            <div className={styles.header__button}>login</div>
                        </div>
                    </div>
                        
                    <div >
                        <form ref={session} className={styles.window_session} onSubmit={(e)=> handleSubmit(e)} action="" >
                                <label>usuari</label>
                                <input name="uss" type="text" className={styles.window_session__input} />
                            
                                <label className="cente">contraseña</label>
                                <div className={styles.window_session__input_password}>
                                    <input name="contra" type="password" className={styles.window_session__input} />
                                    <div className={styles.window_session__see}>
                                        <Image src="/images/eyeball-icon-png-eye-icon-1.png" alt="me"
                                        height="20" width="20"/>    
                                    </div>
                                    
                                </div>
                                <input type="submit" className={styles.window_session__button_send} value="sign in"/>
                                <label dangerouslySetInnerHTML={{__html : requestMessege}}></label>
                        </form>
                    </div>
                
            </header>
        <div className={styles.mar}></div>
        
    </>
    )
}
export default Header