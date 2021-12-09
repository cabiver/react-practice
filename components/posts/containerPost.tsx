import style from '@styles/componets/posts/post_component.module.css'
import Image from 'next/image'
const ConteinerPost = (props: any) => {
  // console.log(props)
  const convertidorADias = (diaComparador : string) => {
    if (diaComparador === 'Mon') return 'lunes'
    if (diaComparador === 'Tues') return 'martes'
    if (diaComparador === 'Wed') return 'miercoles'
    if (diaComparador === 'Thu') return 'jueves'
    if (diaComparador === 'Fri') return 'viernes'
    if (diaComparador === 'Sat') return 'sabado'
    if (diaComparador === 'Sun') return 'domingo'
    return diaComparador
  }
  const convertidorAMes = (mesComparador : string) => {
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

  const descrip = props.mesage.split('█')
  const fecha = descrip[0].split(' ')
  const dia = fecha[0]
  const mes = fecha[1]
  const diaDelMes = fecha[2]
  const year = fecha[3]

  const fechaText = convertidorADias(dia) + ' ' + convertidorAMes(mes) + ' ' + diaDelMes + ' ' + year

  return (
    <>
    <div className={style.posts__Container}>
      <div className={style.posts__body}>
      <div>
        <p className={style.posts__date}>
          {fechaText}
        </p>
        {/* <div className={style.flexGrow}>

        </div> */}
      </div>
      <div>
          {descrip[1]}
      </div>

    <div className={style.posts_image}>

        <Image
        src={props.url}
        alt=""
        // sizes="100vw"
        objectFit="contain"
        layout="fill"/>
      </div>
      </div>

    </div>
    </>
  )
}
export default ConteinerPost
