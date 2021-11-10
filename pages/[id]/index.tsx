import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Posts from '../../components/accounts/principal/posts'
function MyPage () {
  const inicial = useRouter()
  const [icon, setIcon] = useState(null)
  useEffect(() => {
    if (!inicial.query.id) {
      return
    }
    axios.post('/api/' + inicial.query.id, {})
      .then((res) => {
        console.log(res)
        setIcon(res.data.icon)
      })
  }, [inicial])
  return (
  <>
    <Image src={`/${icon}`}

    width="25"
    height="25"
    alt="yo que se"></Image>
    <h1 > hola señorita como lo llevas

    </h1>
    <Posts></Posts>
  </>
  )
}
export default MyPage
