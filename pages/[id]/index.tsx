import { useRouter } from 'next/router'
import cookie from 'js-cookie'
import Image from 'next/image'
function MyPage () {
  const router = useRouter()
  const { id } = router.query
  console.log(cookie.get('icon'))
  return (
  <>
    <Image src={`/${cookie.get('icon')}`}
    layout="responsive"
    width="25"
    height="25"
    alt="yo que se"></Image>
    <h1> hola señorita como lo llevas { id }
      con nombre de
    </h1>

  </>
  )
}
export default MyPage
