import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import cookies from 'js-cookie'
import '@styles/componets/posts/post_component.module.css'
import PostComponent from '../../posts/containerPost'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import style from '@styles/componets/posts/addMorePosts.module.css'
import Titule from '../../shareds/titule'
// let postsViews: any[] = []

function MyAccount () {
  const [postsViews, setPostsViews] = useState<any[]>([])
  function createMorePhoto () {
    setLimit((e) => true)
    if (!noMorePost.current) {
      return
    }
    noMorePost.current.style.display = ''
  }

  const handleChange = () => {
    if (!formPost.current) {
      return
    }
    const form = new FormData(formPost.current)
    if (!form.get('image')) {
      return
    }
    const data = form.get('image') as File
    setFile(data)
    // console.log(file)
  }
  const handleSubmit = (e:any) => {
    e.preventDefault()
    const name = cookies.get('userName')
    if (!formPost.current || !file || !name) {
      return
    }

    const des = (new FormData(formPost.current)).get('description')
    const form = new FormData()
    form.set('image', file)
    des
      ? form.set('description', des)
      : form.set('description', '')

    // console.log(form.get('image'))
    axios.post(`/api/addPost/${name}`, form)
  }
  const handelDrag = (e: any) => {
    e.preventDefault()
    console.log('drag activado')
  }
  const handleDrop = (e: any) => {
    e.preventDefault()
    console.log(e)

    if (!e.dataTransfer.files[0]) {
      console.log('no existe el archivo')
      return
    }
    setFile(e.dataTransfer.files[0])
    // const reader = new FileReader()
    // reader.readAsArrayBuffer(e.dataTransfer.files[0])
    // reader.addEventListener('load', e => {
    //   if (!e.currentTarget) {
    //     return
    //   }
    //   const videofinalizado = new Blob([new Uint8Array(e.currentTarget?.result)], { type: 'video/mp4' })
    //   const url = URL.createObjectURL(videofinalizado)
    // })
  }

  const inicial = useRouter()
  const [canload, setCanload] = useState(true)
  const [limit, setLimit] = useState(false)
  const [contador, setContador] = useState(0)
  // const [canDelete, setCanDelete] = useState(true)
  const [visible, setVisible] = useState(false)
  const [feedBackFile, setFeedBackFile] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const formPost = useRef<HTMLFormElement>(null)
  const noMorePost = useRef<HTMLDivElement>(null)
  const loader = useRef(null)
  const marco = useRef<HTMLDivElement>(null)
  // const cal =
  const cal = useCallback(async () => {
    if (!inicial.query.id) {
      return
    }
    if (!canload || limit) {
      return
    }
    setCanload(false)
    const respuesta = await axios.post(`/api/accounts/${inicial.query.id}`, {
      cont: contador,
      amigosVisitados: []

    })
    if (respuesta.statusText === 'OK') {
      if (respuesta.data.length === 0) {
        createMorePhoto()
        return
      }
      if (respuesta.data.content.length < 3) {
        createMorePhoto()
      }
      setTimeout(() => {
        setCanload(true)
      }, 2000)
      // console.log(postsViews)
      // console.log(respuesta.data.content)
      setPostsViews(previousPosts => [...previousPosts, ...respuesta.data.content])
      setContador((cont) => cont + 3)
    } else {
      console.log(respuesta)
    }
    // window.location.reload()
  }, [inicial.query.id, canload, limit, contador])
  useEffect(() => {
    cal()
  }, [visible, cal])

  useEffect(() => {
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    const image = URL.createObjectURL(file)
    setFeedBackFile(() => image)
  }, [file])

  useEffect(() => {
    const observer = new IntersectionObserver(() => {
      setVisible((vi) => !vi)
    })
    if (!loader.current) {
      return
    }
    observer.observe(loader.current)
  }, [loader])
  return (
    <div>
      <div className={style.more_images}>
        <form ref={formPost} onSubmit={(e) => handleSubmit(e)} className={style.more_images__window}>
          <input id="imgFile" onChange={handleChange} type="file" name="image" style={{ display: 'none' }}/>
          <label htmlFor="imgFile" className={style.more_images__button}>sube una imagen</label>
          <div onDragOver={(e) => handelDrag(e) } onDrop={(e) => handleDrop(e) } className={style.more_image__load_imge}>
            <div id="barra-de-carga"></div>
            <video id="loadVideo" className="render-de-video pc" src="" style={{ width: '0' }}></video>
            {
              !file
                ? <>insert some image or video</>
                : <img src={feedBackFile} alt="render post image" className={style.more_images__img}/>
            }
          </div>
          <input className={style.more_images__description} autoComplete="off" type="text" placeholder='add description' name="description"/>
          <button className={style.more_images__button}>subir Post</button>
        </form>
      </div>

      <div className={style.postContainer} ref={marco}>
          { !postsViews
            ? null
            : postsViews.map((e, index) => <PostComponent key={index} url={e.postImg} mesage={e.desc} fecha={e.fecha}/>)
          }
      </div>

      <div style={{ height: '24px' }} ref={loader}></div>
      <div ref={noMorePost} style={{ display: 'none' }}>
        <Titule
        margin={true}
        mensage="there isn't any post"/>
      </div>

    </div>

  )
}

export default MyAccount
