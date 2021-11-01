import {useEffect, useRef, useState } from 'react'
import axios from 'axios'

export default function MyAccount(props) {
    const [canload, setCanload] = useState(true);
    const [limit, setLimit] = useState(false);
    const [contador, setContador] = useState(0);
    const [canDelete, setCanDelete] = useState(true);
    const [visible, setVisible] = useState(false);
    
    const noMorePost = useRef();
    const refCanLoad = useRef();
    const loader = useRef();
    const marco = useRef();

    const convertidorADias = (diaComparador) => {
        if (diaComparador === 'Mon') return 'lunes'
        if (diaComparador === 'Tues') return 'martes'
        if (diaComparador === 'Wed') return 'miercoles'
        if (diaComparador === 'Thu') return 'jueves'
        if (diaComparador === 'Fri') return 'viernes'
        if (diaComparador === 'Sat') return 'sabado'
        if (diaComparador === 'Sun') return 'domingo'
        return diaComparador
    }
    const convertidorAMes = (mesComparador) => {
        if (mesComparador === 'Jan') return 'march'
        if (mesComparador === 'Mar') return 'marzo'
        if (mesComparador === 'Feb') return 'febrero'
        if (mesComparador === 'Apr') return 'abril'
        if (mesComparador === 'May') return 'Mayo'
        if (mesComparador === 'Jun') return 'Junio'
        if (mesComparador === 'Jul') return 'julio'
        if (mesComparador === 'Aug') return 'Agosto'
        if (mesComparador === 'Sep') return 'septiembre'
        if (mesComparador === 'oct') return 'obtubre'
        if (mesComparador === 'Nov') return 'Noviembre'
        if (mesComparador === 'Dec') return 'Diciembre'
        return mesComparador
    }
    function createX(element) {
        const divDelete = document.createElement('img')
        divDelete.setAttribute('class', 'deleteX deleteListener')
        divDelete.setAttribute('referen', element)
        divDelete.setAttribute('src', 'images/Transparent_X.png')
        return divDelete
    }
    function actualizarDelete() {
        const arrayAllDelete = document.querySelectorAll('.deleteListener')
        for (let index = 0; index < arrayAllDelete.length; index++) {
            arrayAllDelete[index].addEventListener('click', async e => {
                if (canDelete) {
                    setCanDelete(false)
                    const formdata = new FormData()
                    formdata.set('parametros', e.target.attributes.referen.nodeValue)

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
    function createImgVideo(element, complement, ast, indice) {
        const descrip = complement.split('█')
        const nars = document.createElement('div')
        const content = document.createElement('div')
        ast.setAttribute('src', element)
        ast.setAttribute('class', ' precentacion')
        const descr = document.createElement('p')
        descr.setAttribute('class', ' fuente')

        const fechaDePosteo = document.createElement('p')
        const fecha = descrip[0].split(' ')
        const dia = fecha[0]
        const mes = fecha[1]
        const diaDelMes = fecha[2]
        const year = fecha[3]

        const fechaText = convertidorADias(dia) + ' ' + convertidorAMes(mes) + ' ' + diaDelMes + ' ' + year
        fechaDePosteo.innerHTML = fechaText
        fechaDePosteo.setAttribute('class', 'fecha-post')
        const contentenFlex = document.createElement('div')
        contentenFlex.setAttribute('class', 'flex-para-contenido')
        const complemento = document.createElement('div')
        complemento.setAttribute('class', 'flexGrow')
        const divDelete = createX(element)
        contentenFlex.appendChild(fechaDePosteo)
        contentenFlex.appendChild(complemento)
        contentenFlex.appendChild(divDelete)
        content.appendChild(contentenFlex)
        descr.innerHTML = descrip[1]
        content.appendChild(nars)
        nars.appendChild(descr)
        nars.appendChild(ast)
        nars.setAttribute('class', 'mar')
        content.setAttribute('class', 'div-para-marco')
        marco.current.appendChild(content)
    }
    function createMorePhoto() {
        setLimit((e) => true)
        noMorePost.current.style.display = ''
    }
    function elementos(p) {
        const op = p.data.content
        if (p !== undefined) {
            op.forEach(element => {
                const extencion = element.postImg.split('.')
                if (extencion[(extencion.length - 1)] === 'mp4' || extencion[(extencion.length - 1)] === 'avi') {
                    const ast = document.createElement('video')
                    ast.setAttribute('controls', '')
                    createImgVideo(element.postImg, element.desc, ast)
                } else {
                    if (extencion[(extencion.length - 1)] === 'mp3' || extencion[(extencion.length - 1)] === 'ogg' || extencion[(extencion.length - 1)] === 'wav') {
                        const ast = document.createElement('audio')
                        ast.setAttribute('controls', '')
                        createImgVideo(element.postImg, element, element.desc, ast)
                    } else {
                        const ast = document.createElement('img')
                        createImgVideo(element.postImg, element.desc, ast)
                    }
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
        if (!canload || limit) {
            return
        }
        setCanload(false)
        const respuesta = await axios.post(props.peticionPost + window.location.pathname, {
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
            setContador((cont)=>cont + 3)
        } else {
            console.log(respuesta)
        }
    }
    refCanLoad.current = cal
    useEffect(()=>{
        refCanLoad.current()
    },[visible])
    useEffect((e) => {
        const observer = new IntersectionObserver(()=>{
            setVisible((vi)=> !vi)
        })    
        observer.observe(loader.current)    
    }, [])
    return (
        <div>
            <div className="marco" ref={marco}>

            </div>

            <div style={{ height: "24px" }} ref={loader}></div>
            <div className="FLEXBOX JUSTIFY-CONTENT">
                <div ref={noMorePost} className="div-para-marco FLEXBOX ALIGN-ITEMS" style={{display: "none"}}>
                    <p className=" fuente">ya no hay mas fotos?</p>
                </div>
            </div>

        </div>

    )
}

