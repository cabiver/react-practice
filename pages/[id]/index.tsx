import { useRouter } from "next/router"

function MyPage (){
    const router = useRouter()
    const { id } = router.query
    console.log(id)
    return(
        <h1> hola señorita como lo llevas { id }</h1>
    )
}
export default MyPage