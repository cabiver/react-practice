
import Image from 'next/image'
import Posts from './addMorePosts'
import style from '@styles/account/principal_account.module.css'

function AccountExist ({ background, icon, name } :any) {
  return (
  <>
    {
      background
        ? <Image src={background}
      width="2688"
      height="1512"
      layout="responsive"
      alt="persona 5"
      priority>
      </Image>
        : <div>
        loading
      </div>
    }
    <div className={style.user_container}>
      <div>
        {
          icon
            ? <Image src={icon} alt=""
              width='60' height='60'/>
            : <div> loading </div>
        }

      </div>
      <div>
        {name}
      </div>
    </div>
    <Posts></Posts>
  </>
  )
}

export default AccountExist
