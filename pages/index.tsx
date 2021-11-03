import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Full from './principalPage/full'
import Text from './principalPage/text'
const Home: NextPage = () => {
  return (
    <>
      <Full></Full>
      <div> you never see it&apos;s comming </div>
      <Text></Text>  
    </>
    
  )
}

export default Home
