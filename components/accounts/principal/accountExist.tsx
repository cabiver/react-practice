
import Image from 'next/image'
import Posts from './addMorePosts'
import style from '@styles/account/principal_account.module.css'
import styleInput from '@styles/servis/inputs.module.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function AccountExist ({ background, icon, name } :any) {
  const [formIconVisible, setFormIconVisible] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [FormIcon, setFormIcon] = useState<string | null>(null)
  const formIcon = useRef<HTMLFormElement>(null)
  const handleChange = () => {
    if (!formIcon.current) {
      return
    }
    const form = new FormData(formIcon.current)
    if (!form.get('image')) {
      return
    }
    const data = form.get('image') as File
    setFile(data)
  }
  const handelSubmit = (e:any) => {
    e.preventDefault()
    if (!file || !formIcon.current) {
      return
    }
    const form = new FormData(formIcon.current)
    axios.post(`/api/changeIcon/${name}`, form)
  }
  useEffect(() => {
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    const image = URL.createObjectURL(file)
    setFormIcon(() => image)
  }, [file])
  return (
  <>
    {
      background
        ? <>

        <div className={style.background_container}>
          <div className={style.background_difuminado}>
            <Image
            src={background}
            width="2688"
            height="1512"
            alt="persona 5 difuminado"
            priority
            />
          </div>
          <div className={'body-responsive'}>
            <Image
            src={background}
            width="2688"
            height="1512"
            layout="responsive"
            alt="persona 5"
            priority>
            </Image>
          </div>

        </div>

      </>
        : <div>
        loading
      </div>
    }
    <div>
      <div className={style.user_container}>
        <div className={style.user_div}>
          {
            icon
              ? <div className={style.icon} onClick={() => setFormIconVisible(visible => !visible)}>
                <Image src={icon} alt=""
                width='60' height='60'/>
              </div>
              : <div> loading </div>
          }
          <div>
            {name}
          </div>
        </div>
      </div>
    </div>
    {
      formIconVisible
        ? <form ref={formIcon} onSubmit={(e) => handelSubmit(e)} className={`${styleInput.form_container} ${styleInput.form_container___w40}`} action="">
      <input onChange={handleChange} id="iconImag" name="image" type="file" style={{ display: 'none' }}/>
      <label>do you wanna change you icon?</label>
      <label htmlFor="iconImag" className={styleInput.form__button}>upload img</label>
      {
        FormIcon
          ? <img src={FormIcon} className={style.FormImage} alt=""/>
          : null
      }

      <label className="resultIcono" htmlFor=""></label>
      <button className={styleInput.form__button}>enviar icono</button>
    </form>

        : null
    }

    <Posts></Posts>
  </>
  )
}

export default AccountExist
