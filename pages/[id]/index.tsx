import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
// import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import Posts from '../../components/accounts/principal/posts'

function MyPage () {
  const inicial = useRouter()
  const [background, setBackground] = useState(null)
  // useEffect(() => {
  // const dataBackground = Cookies.get('background')
  //   if (!dataBackground) {
  //     return
  //   }
  //   console.log(dataBackground)
  //   setBackground(dataBackground)
  // }, [])
  useEffect(() => {
    if (!inicial.query.id) {
      return
    }
    axios.post('/api/' + inicial.query.id, {})
      .then((res) => {
        console.log(res)
        setBackground(res.data.background)
      })
  }, [inicial])
  return (
  <>
    {
      background
        ? <Image src={`/${background}`}
      width="2688"
      height="1512"

      layout="responsive"
      alt="persona 5">

      </Image>
        : <div>
        loaad
      </div>
    }
    <h1 > hola señorita como lo llevas

    </h1>
    <Posts></Posts>
  </>
  )
}
export default MyPage
