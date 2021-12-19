import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import Error404 from '../404'
import Exist from '../../components/accounts/principal/accountExist'

function MyPage () {
  const inicial = useRouter()
  const [accountExist, setAccountExist] = useState<boolean | null | undefined>(undefined)
  const [background, setBackground] = useState<string | undefined>(undefined)
  const [icon, setIcon] = useState<undefined | string>(undefined)

  useEffect(() => {
    if (!inicial.query.id) {
      return
    }
    const { id } = inicial.query

    if (id === Cookies.get('userName')) {
      const dataBackground = Cookies.get('background')
      const dataIcon = Cookies.get('icon')
      if (dataBackground !== undefined && dataIcon !== undefined) {
        setBackground(dataBackground)
        setAccountExist(true)
        setIcon(dataIcon)
        return
      }
    }

    const peticion = async () => {
      const res = await axios.post(`/api/${inicial.query.id}`, {})
      console.log(res)
      setBackground(res.data.background)
      setAccountExist(res.data.exist)
      setIcon(res.data.icon)
    }
    peticion()
  }, [inicial])
  return (
    <>
      {
        accountExist
          ? <>
            <Exist background={background} icon={icon} name={inicial.query.id}/>
          </>
          : accountExist === undefined
            ? <>loding</>
            : <Error404/>
      }
    </>
  )
}
export default MyPage
