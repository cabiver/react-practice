
import Image from 'next/image'
import Posts from './addMorePosts'

function AccountExist ({ background } :any) {
  return (
  <>
    {
      background
        ? <Image src={`/${background}`}
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
    <Posts></Posts>
  </>
  )
}

export default AccountExist
