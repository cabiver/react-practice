import React, {useEffect} from "react"
import Header from "../globalComponets/Header"
import Post from '../globalComponets/posts'

export default function MyAccount(props) {
    useEffect(() => {

    },[]);
    
    return (
    <>
        <Header></Header>
        <Post peticionPost="/UltimosPost"></Post>
    </>
    )
}