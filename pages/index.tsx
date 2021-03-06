import type { NextPage } from 'next'
import Full from '../components/principalPage/full'
import Text from '../components/principalPage/text'
import ElementLi from '../components/principalPage/elementLi'
import Footer from '../components/principalPage/footer'
import style from '@styles/principalPage/index.module.css'
import Titule from '../components/shareds/titule'
// import Titule from '@components/shareds/titule'

const Home: NextPage = () => {
  const dataList :Array<string> = [
    'primero cree el html y el estilo, vi un normalize que me dejaria estandarizar el aspecto en otros browser',
    'aprendi javascript casi de 0, pues sabia programacion desde antes, pero no tanto como las tecnologias que me ofrecio js',
    "aprendi los eventos y hice que cuando undieras en 'sign_in' le agregara una clase para ponerlo en pantalla, y cuando quitaras el mouse se le quitara esa clase y se ponga la clase para ocultarlo, como no se crea, se guarda lo que escribieras, por costo de que carge mas lento la pagina",
    "empece a practicar node.js, alcance a hacer cosas con el localhost en el puerto 3000, ademas de poner las peticiones GET de las paginas para mostrarlas y una con error '404 not found'",
    'vi que antes accedia a un archivo, pero ahora lo que hace es llamar a servidor y te devuelve el archivo, no es entrar al achivo en especifico',
    'aprendi express para facilitarme el uso de las peticiones y todo lo demas, comenzar sin express me resulta mazoquista',
    'vi que existe algo llamado react, que es para hacer mas faciles interfaces y cosas asi, pero todavia no lo eh usado',
    'antes me metia a paginas conocidas y vi que importaban muchos archivos JS, pero no solo eras suyos, por ejemplo en react tube que importar 2 para que me funcionara, pues los scripts que se entran en la cabezera son de axios, que es una alternativa de usar fecth, para mi se ve mas bonito y sensillo',
    'empece a ver un porgrama de peticiones a las base de datos, ya sabia desde antes cosas de MYsql, pero escuche que mongodb es mas sencillo usarlo con js, y no era relacional, queria ver como funcionaba una base de datos distinta',
    'hice peticiones post al server mandando un json con la contrase??a y usuario, si el nombre de usuario existe te respondera con dos cosas, Metodo y Mensage, el mesaje es donde guarde la valiable por si el usuario existe, para que se pueda tener un feedback de que no puedes usar el nombre de usuario, y el metodo es un bolean que te dice si puede redirigir a la pagina creada para el usuario',
    'Para redirigir al usuario de forma que pueda tener una icono y contenido, se tiene que guardar en su base de datos, el server solo te manda donde se encuentra ubicado estos datos, y se renderiza con un motor de plantilla, que es para meter JS en HTML, principalmente lo use para colocar las localizaciones de su contenido en propiedades HREF',
    'ahora llego lo definitivo, poder postear imagenes en tu base de dato, parece que voy a guardar el archivo en la base de datos, pero no, lo que en realidad nesesitaba es que se guarde en mi pc y que en la base de dato se guarde la direccion de este post(HREF)',
    'vi que existia algo llamado FORM DATA esto sirve para mandar datos al servidor, pero a diferencia de volverlos JSON por alguna razon el video y los File estaban vacios al transformarlos a JSON, entonces tuve que guardar los datos y mandarlos en Form data, aunque se lee de la misma mane ra que mandarlo en un JSON',
    'en la parte del server use expressFileUpdate que me movia los archivos mandalos al server en un ligar expicicos, y poder manejar el archivos y donde guardarlos',
    'aqui encotre un problema, si un usuario publica un archivo con el mismo nombre se iba a eliminar el anterior, que use uuid que es para generar texto de forma aleatoria, y lo combinava con el nombre asi no se iran a sobre escribir',
    'hay algo en mongodb que no deja guardar archivos identicos en un array, pues las imagenes y descripciones estan en un array, entonces decidi colocar la Data que es la fecha de este posteo, eso me agregaria una funcionalidad de poder ver la fecha de posteo de la publicacion y arreglaria el problema de las descripciones',
    'habia tenido la pagina de las cuentas con poco css asi que decide ocuparme con el frontend otra vez, aqui intente de hacer responsive las cosas y viendo como usar funciones responsive en JS',
    "en la pagina principal esta la ventana de iniciar sesion, antes esa ventana era hijo del header y le colocaba un margin auto a la izquierda, eso hacia que se corriera a la derecha pero no se podia pulsar el register si estos estaban al mismo nivel, vi paginas como youtube de como hacian la ventana que sale al pulsar tu icono, este se rije por un posicion absoluto y es calculado con JS, pero como soy especial li calculaba con Right sin darme cuenta que el innerWidth no cuenta el width de la barra desplazadora, esto asia que en celular se pueda ver bien, pero en pc se veia un poco tirado a la izquierda, como soy especial no queria cambiarme a left asi que busque hasta encontar 'document.body.offsetWidth' que es el width de contando las barras de desplazamiento",
    'ahora queria agregar cosas mas estilizadas a la paginas de cuentas, vi facebook y vi que tenian unas camaras con unos mas en sus esquinas, dando sec??al al usuario que puedes cambiarlo pulsandolos, replique esta funcion que hice anterio, mente, pero los position absoluto son bastante raro de usar, nose como explicarlo, es como si divs que no tengas width o display block no les pudieras sacar su width y te marque 0',
    'vi que google usar las valiebles de css de una forma peculiar, las podemos dividir en dos, las variables de rbga y las variables de color, en las rbga solo guarda 3 numeros de conforme su color por ejemplo el blanco: 255, 255, 255; en cambio la de color llaman las valiables de rgba y les agrega opecidad que prefieran ejemplor un balnco con opacidad 0.7: rgba(var(----blaco-rgba),0.7)',
    'combine los de las variable y background-image con degadaro para tener una pagina conmas suavisado',
    'ahora volver al backend, vi que para saber que estas logiado tenias que tener una certificacion en tu browser, asi que use JWT que son JSON encritados, estos puedes ponerles la informaci??n que quieras y seran encriptados con una palabra, esa palabra tiene que ser secreta, porque si no todos podrian saber lo que guardas en ellas, entonces cuando te logeas te manda el toquen y cuando cierras la sesion se elimina el token, esto es para autorisar a cosas como postear y cambiar imagenes, pues ahora las peticiones con estas funcionalidades te van a pedir un toiken y si no lo tienes no hara nada',
    'hice algo grave que es poner al servidor con la capacidad de ver archivos de todo el projecto, en esto se encontraba el server y otras cosas, esto no lo pueden modicicar ellos, pero pueden ver como funciona el server para ver como tirarlo o que te den otras cosas, por lo cual puede llegar a ser peligroso, pues pediria los archivos de tu base datos, ver la palabra de la que se encripta las contrase??as t los tokens',
    'pues nada, ahora vamos a hacer que el usuario pueda agregar imagenes y una descripcion, para esto renove el modelo de mongo y puse un apartado de post donde se guardara las imagenes y la descripcion, vi que express tiene algo llamado EXPRESS-FILEUPLOAD que es para manejar archivos y asi poderlos almacenar en la pc, y los que se guardara en la base de datos es la direccion de este archivo',
    'cada vez que el usuario guarda no ponia su post mas reciente, pues no sabi agregar en la parte adelantera de mongo, asi que cada ves que cargar un archivo de el mismo server lo pone al principio y se actualiza todo el campo de mongo',
    'Ya vi como ponerlo al principio con mongoose, evidentemente necesitaba hacerlo, por mero morbo'
  ]
  return (
    <>
      <Full/>
      <Titule
      absolute={true}
      mensage="mi pagina para probar mi forntend y backend"/>
      <div className={style.text_area}>
        <Text></Text>
        {dataList.map((el:string, index:number) => <ElementLi key={index} text={el}/>)}
      </div>
      <Footer></Footer>
    </>

  )
}

export default Home
