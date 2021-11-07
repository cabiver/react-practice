import { useRouter } from 'next/router'
// import cookie from 'js-cookie'
// import Image from 'next/image'
import axios from 'axios'
import { useEffect } from 'react'
function MyPage () {
  const inicial = useRouter()

  useEffect(() => {
    if (!inicial.query.id) {
      return
    }
    axios.post('/api/' + inicial.query.id, {})
      .then((res) => console.log(res))
  }, [inicial])
  return (
  <>
    {/* <Image src={`/${cookie.get('icon')}`}
    layout="responsive"
    width="25"
    height="25"
    alt="yo que se"></Image> */}
    <h1 > hola señorita como lo llevas
    </h1>

  </>
  )
}
export default MyPage
