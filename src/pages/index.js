import { Avatar } from '@/components/Avatar'
import { SendIcon, ChatGPTLogo } from '@/components/Icons'
import { TypingEffect } from '@/components/TypingEffect'
import Head from 'next/head'
import { useMessageStore } from '@/store/messages'
import { useRef } from 'react'

function Layout ({ children }) {
  return (
    <>
      <Head>
        <title className='hola'>Castro Bot</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <div id='chat' className='w-full relative bg-black h-screen text-slate-50 overflow-y-auto'>
        {/* <Aside /> */}
        {children}
        {/* <div className=' text-center'>
          <span className='bg-black  text-opacity-50 text-white'>Made By David Castro</span>
        </div> */}
      </div>
    </>
  )
}

// function Aside () {
//   return (
//     <aside className=' bg-gptdarkgrey fixed flex w-64 h-screen flex-col'>
//       <nav className='flex flex-col flex-1 h-full p-2 space-y-1'>
//         <button className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10
//         transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border
//          border-white/20'
//         >
//           <PlusIcon />
//           New chat
//         </button>
//       </nav>
//     </aside>
//   )
// }

function UserAvatar () {
  return (
    <img
      alt='foto de david'
      src='https://www.davidcastro.tech/static/images/david.jpg'
    />
  )
}

function Message ({ ia, message }) {
  const avatar = ia ? <ChatGPTLogo /> : <UserAvatar />
  const textElement = ia ? <TypingEffect text={message} /> : message
  return (
    <div>
      <article className='flex gap-4 p-6 m-auto max-w-3xl text-gray-100 '>
        <Avatar>{avatar}</Avatar>
        <div className=' flex-1'>
          <p className={`${ia ? ' bg-purple-700' : ' bg-green-700'} rounded-md p-4`}>{textElement}</p>
        </div>
      </article>
    </div>
  )
}

function Chat () {
  const messages = useMessageStore(state => state.messages)

  // const handleChange = () => {
  //   const chatContainer = document.getElementById('chat')
  //   window.scroll(chatContainer.scrollTop)
  // }

  return (
    <div className='flex flex-col h-full flex-1'>
      <ChatForm />
      <main id='chat' className=' mt-[180px]'>
        {messages.map((entry) => (
          <Message key={entry.id} {...entry} />
        ))}
      </main>
    </div>
  )
}

function ChatForm () {
  const sendPrompt = useMessageStore(state => state.sendPrompt)
  const textAreaRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { value } = textAreaRef.current
    sendPrompt({ prompt: value })
    textAreaRef.current.value = ''
  }

  const handleChange = () => {
    const el = textAreaRef.current
    const scrollHeight = el.scrollHeight
    el.style.height = scrollHeight + 'px'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className='w-full fixed top-0 bg-black'>
      <section className=' m-4 justify-center bg-neutral-900 border-neutral-600 border-2 rounded-lg p-3 pb-7'>
        <h1 className=' text-center text-3xl pb-3'>CastroBot</h1>
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className=' w-full m-auto'
        >
          <div className='relative flex flex-col py-3 px-4 border flex-grow
        border-gray-900/50 text-white bg-gptlightgray rounded-md '
          >
            <textarea
              onChange={handleChange}
              ref={textAreaRef}
              rows={1}
              tabIndex={0}
              autoFocus
              defaultValue=''
              placeholder='Ask me something'
              className='h-[24px] resize-none bg-transparent border-0 outline-none'
            />
            <button className='absolute p-1 rounded-md bottom-2.5 right-2.5'>
              <SendIcon />
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default function Home () {
  return (
    <>
      <Layout>
        <Chat />
      </Layout>
    </>
  )
}
