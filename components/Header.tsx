import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import styles from '@styles/principalPage/header.module.css'

const Header = ()=>{
    const session = useRef<HTMLFormElement>(null)
    const [create,setCreate] = useState(false)
    
    const handleClickSession = ()=>{
        setCreate(exist => !exist)
    }
    const handleSubmit = async (e:any)=>{
    
        e.preventDefault();
       
    }
    useEffect(()=>{
        session?.current?.style.display = create?'':'none';
    },[create])
    
    return (
            <>
            <header className={styles.header}>
                    <div className={styles.nav}>
                        <div className={styles.header__container__button}>
                            <div onClick={handleClickSession} className={styles.header__button}>login</div>
                        </div>
                    </div>
                        
                    <div >
                        <form ref={session} className={styles.window_session} onSubmit={(e)=>{handleSubmit(e)}} action="" >
                                <label>usuari</label>
                                <input type="text" className={styles.window_session__input} />
                            
                                <label className="cente">contraseña</label>
                                <div className={styles.window_session__input_password}>
                                    <input type="password" className={styles.window_session__input} />
                                    <div className={styles.window_session__see}>
                                        <Image src="/images/eyeball-icon-png-eye-icon-1.png" alt="me"
                                        height="20" width="20"/>    
                                    </div>
                                    
                                </div>
                                <input type="submit" className={styles.window_session__button_send} value="sign in"/>
                                <label className="negrillas"></label>
                        </form>
                    </div>
                
            </header>

        
    </>
    )
}
export default Header