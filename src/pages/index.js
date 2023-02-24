import Head from 'next/head'
import { Chat } from '@/components/Chat'

function Layout ({ children }) {
  return (
    <>
      <Head>
        <title className='hola'>Castro Bot</title>
        <meta
          name='description' content='CastroBot is a web application that allows users to chat with
          an intelligent virtual assistant built with Next.js, a popular web framework.'
        />
      </Head>
      <div id='chat' className='w-full relative bg-black h-screen text-slate-50 overflow-y-auto'>
        {children}
      </div>
    </>
  )
}

export default function Home () {
  return (
    <>
      <Layout>
        <Chat />
      </Layout>
      <script src='https://kit.fontawesome.com/a654d59b05.js' crossorigin='anonymous' async />
    </>
  )
}
