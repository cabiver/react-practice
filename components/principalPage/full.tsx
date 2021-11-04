import Image from 'next/image'
import style from '../../styles/principalPage/full.module.css'


function Full () {
    return (
        <div className={style.full}>

            <a href="register" className={style.button_register__container}>
                <div className="boton feedback_boton">
                    <b>register</b>
                </div>
            </a>

            <div>
                <Image priority src="/images/background.jpg" alt="me" width="3840" height="2160" layout="intrinsic" />
            </div>
        </div>

    )
}

export default Full


