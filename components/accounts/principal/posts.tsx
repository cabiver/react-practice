import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import cookies from 'js-cookie'
import '@styles/componets/posts/post_component.module.css'
import PostComponent from '../../posts/containerPost'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import style from '@styles/componets/posts/posts.module.css'

let postsViews: any[] = []

function MyAccount () {
  // function createX (element : any) {
  //   const divDelete = document.createElement('img')
  //   divDelete.setAttribute('class', 'deleteX deleteListener')
  //   divDelete.setAttribute('referen', element)
  //   divDelete.setAttribute('src', 'images/Transparent_X.png')
  //   return divDelete
  // }
  function actualizarDelete () {
    const arrayAllDelete = document.querySelectorAll('.deleteListener')
    for (let index = 0; index < arrayAllDelete.length; index++) {
      arrayAllDelete[index].addEventListener('click', async (e) => {
        const target = e.target as HTMLDivElement
        if (!target) {
          return
        }
        if (canDelete) {
          setCanDelete(false)
          const formdata = new FormData()
          formdata.set('parametros', target.attributes.referen.nodeValue)

          const element = await axios.post('/deleteimagen' + window.location.pathname, formdata)
          console.log(element)
          if (element.statusText === 'OK') {
            window.location.reload()
          } else {
            console.log('ocurrio un fallo al eliminar')
          }
        }
      })
    }
  }
  function createImgVideo (element: string, complement:string, ast:HTMLImageElement|HTMLVideoElement|HTMLAudioElement) {
    // if (!marco.current) {

    // }
    // const descrip = complement.split('█')
    // const fecha = descrip[0].split(' ')
    // const dia = fecha[0]
    // const mes = fecha[1]
    // const diaDelMes = fecha[2]
    // const year = fecha[3]

    // const fechaText = convertidorADias(dia) + ' ' + convertidorAMes(mes) + ' ' + diaDelMes + ' ' + year

    // const nars:HTMLDivElement = document.createElement('div')
    // const content:HTMLDivElement = document.createElement('div')
    // ast.setAttribute('src', element)
    // ast.setAttribute('class', ' precentacion')
    // const descr :HTMLParagraphElement = document.createElement('p')
    // descr.setAttribute('class', ' fuente')

    // const fechaDePosteo = document.createElement('p')

    // fechaDePosteo.innerHTML = fechaText
    // fechaDePosteo.setAttribute('class', 'fecha-post')
    // const contentenFlex = document.createElement('div')
    // contentenFlex.setAttribute('class', 'flex-para-contenido')
    // const complemento = document.createElement('div')
    // complemento.setAttribute('class', 'flexGrow')
    // const divDelete = createX(element)
    // contentenFlex.appendChild(fechaDePosteo)
    // contentenFlex.appendChild(complemento)
    // contentenFlex.appendChild(divDelete)
    // content.appendChild(contentenFlex)
    // descr.innerHTML = descrip[1]
    // content.appendChild(nars)
    // nars.appendChild(descr)
    // nars.appendChild(ast)
    // nars.classList.add('mar')
    // content.setAttribute('className', 'posts__Container')
    // marco.current.appendChild(content)
  }
  function createMorePhoto () {
    setLimit((e) => true)
    if (!noMorePost.current) {
      return
    }
    noMorePost.current.style.display = ''
  }
  function elementos (p:any) {
    // console.log(p)
    // console.log(p.data.content)

    const op = p.data.content
    // console.log(op)
    if (p) {
      op.forEach((element:any) => {
        const extencion = element.postImg.split('.')
        if (extencion[(extencion.length - 1)] === 'mp4' || extencion[(extencion.length - 1)] === 'avi') {
          const ast = document.createElement('video')
          ast.setAttribute('controls', '')
          createImgVideo(element.postImg, element.desc, ast)
        } else {
          const ast = document.createElement('img')
          createImgVideo(element.postImg, element.desc, ast)
        }
      })
      if (op.length < 3) {
        createMorePhoto()
      }
      actualizarDelete()
      // console.log(contador)
      setTimeout(() => {
        setCanload(true)
      }, 2000)
    }
  }
  const cal = async () => {
    if (!inicial.query.id) {
      return
    }
    if (!canload || limit) {
      return
    }
    setCanload(false)
    // console.log(inicial.query.id)
    const respuesta = await axios.post(`/api/accounts/${inicial.query.id}`, {
      cont: contador,
      amigosVisitados: []

    })
    console.log(respuesta)
    if (respuesta.statusText === 'OK') {
      if (respuesta.data.length === 0) {
        createMorePhoto()
        return
      }
      elementos(respuesta)
      console.log(postsViews)
      console.log(respuesta.data.content)
      postsViews = [...postsViews, ...respuesta.data.content]

      console.log(postsViews)
      setContador((cont) => cont + 3)
    } else {
      console.log(respuesta)
    }
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
    console.log(file)
  }
  const handleSubmit = (e:any) => {
    e.preventDefault()
    const name = cookies.get('userName')
    if (!formPost.current || !file || !name) {
      return
    }

    const form = new FormData(formPost.current)
    console.log(form.get('image'))
    axios.post(`/api/addPost/${name}`, form)
  }

  const inicial = useRouter()
  const [canload, setCanload] = useState(true)
  const [limit, setLimit] = useState(false)
  const [contador, setContador] = useState(0)
  const [canDelete, setCanDelete] = useState(true)
  const [visible, setVisible] = useState(false)

  const feedBackFile = useRef<HTMLImageElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const formPost = useRef<HTMLFormElement>(null)
  const noMorePost = useRef<HTMLDivElement>(null)
  const loader = useRef(null)
  const marco = useRef<HTMLDivElement>(null)
  useEffect(() => {
    cal()
  }, [visible, inicial, cal])

  useEffect(() => {
    // console.log(feedBackFile)
    if (!file || !feedBackFile.current) {
      return
    }
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    const image = URL.createObjectURL(file)
    console.log(feedBackFile.current)
    feedBackFile.current.setAttribute('src', image)
  }, [file, feedBackFile])
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
                <div className={style.more_image__load_imge}>
                    <div id="barra-de-carga"></div>
                    <video id="loadVideo" className="render-de-video pc" src="" style={{ width: '0' }}></video>
                    {
                      !file
                        ? <>insert some image or video</>
                        : <img ref={feedBackFile} alt="render post image" className={style.more_images__img}/>
                    }
                </div>
                {/* <video id="loadVideoMobile" className="render-de-video-mobile" src=""></video>
                <Image id="imagMobile" src="/images/camille-300x300.png" width="25px" height="25px" alt="" className={style.more_images__img}/> */}

                <p className={style.more_images__guie_inputs}>agrega una description</p>
                <input className={style.more_images__description} autoComplete="off" type="text" name="description"/>
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
      <div className={style.doneContainer}>
          <div ref={noMorePost} className="div-para-marco FLEXBOX ALIGN-ITEMS" style={{ display: 'none' }}>
              <p className=" fuente">ya no hay mas fotos?</p>
          </div>
      </div>

    </div>

  )
}

export default MyAccount
