import Header from "./Header"
import Head from 'next/head'
const Container =({children}:any)=>{
    return (
    <>
        <Head>
            <title>cabiver</title>
            
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"/>

        </Head>
        <Header></Header>
        {children}
    
    </>
    )
}
export default Container