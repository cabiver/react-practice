import Image from 'next/image'
import style from '@styles/principalPage/full.module.css'
import Link from 'next/link'

function Full () {
  return (
        <div className={style.full}>

            <Link passHref href="/register">
                <div className={style.button_register__container}>
                    <b>register</b>
                </div>
            </Link>

            <div className={style.container_principal_img}>
                <Image priority={true} src="/images/background.jpg" alt="me" width="2688" height="1512" layout="intrinsic" />
            </div>
        </div>

  )
}

export default Full
