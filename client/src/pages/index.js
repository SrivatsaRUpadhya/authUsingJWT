import Head from 'next/head'
import { Inter } from 'next/font/google'
import Greet from './greet'
import axios from 'axios'
import Router from 'next/router'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [User, SetUser] = useState({});

  useEffect(() => {
    console.log(document.cookie);
    axios.post(`/auth/me`, {
      // 'bearer': window.localStorage.getItem('accessToken')
    },
      {
        headers: {
          'Content-Type': "application/json",
        },
        withCredentials: true,
      }).then((result) => {
        if ((result.data.message === "success") && (result.status == 200)) {
          SetUser(result.data.User);
        }
        else {
          Router.push("/login");
        }
        // result.headers['set-cookie']
      }).catch(err => {
        console.log(err);
        Router.push("/login");
      })

  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Greet user={{ name: User?.name, phone: User?.phone }} />
        <button onClick={()=>{axios.delete("auth/logout").then(Router.push("/login")), {headers:{'Access-Control-Allow-Origin': '*'}, withCredentials:true}}}>Logout</button>
      </main>
    </>
  )
}