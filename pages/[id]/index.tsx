import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import Error404 from '../404'
import Exist from '../../components/accounts/principal/accountExist'
function MyPage () {
  const inicial = useRouter()
  const [accountExist, setAccountExist] = useState<boolean | null | undefined>(undefined)
  const [background, setBackground] = useState<string | null>(null)
  useEffect(() => {
    if (!inicial.query.id) {
      return
    }
    const { id } = inicial.query

    // console.log(id)
    // console.log(Cookies.get('userName'))
    if (id === Cookies.get('userName')) {
      const dataBackground = Cookies.get('background')

      if (dataBackground !== undefined) {
        setBackground(dataBackground)
        setAccountExist(true)
        // console.log('ya tienes un background')
        return
      }
    }

    const peticion = async () => {
      const res = await axios.post('/api/' + inicial.query.id, {})
      console.log(res)
      setBackground(res.data.background)
      setAccountExist(res.data.exist)
    }
    peticion()
  }, [inicial])
  return (
    <>
      {
        accountExist
          ? <Exist background={background}/>
          : accountExist === undefined
            ? <>loding</>
            : <Error404/>
      }
    </>
  )
}
export default MyPage
