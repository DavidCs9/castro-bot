import { IaAvatar } from './IsAvatar'
import { UserAvatar } from './UserAvatar'
import { TypingEffect } from './TypingEffect'
import { Loading } from './Loading'
import { motion } from 'framer-motion'

export function Message ({ ia, message, loading, index }) {
  const avatar = ia ? <IaAvatar /> : <UserAvatar />
  const lines = message.split('\n')
  const messageList = lines.map((line, index) => (
    <p key={index}>{ia ? <TypingEffect text={line} /> : message}</p>
  ))
  const list = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      x: -1000,
      transition: {
        when: 'afterChildren'
      }
    },
    visible: ({ delay }) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay
      }
    }),
    exit: ({ delay }) => ({
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.1,
        delay
      }
    })
  }

  return (

    <motion.div
      custom={{ delay: (index + 1) * 0.2 }}
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={list}
      layoutId={message.id}
    >
      <article className='flex gap-4 p-6 m-auto max-w-3xl text-gray-100 '>
        <figure className={`${ia ? ' bg-purple-700' : ' bg-black'} w-8 h-8 flex items-center justify-center rounded-md`}>
          {avatar}
        </figure>
        <div className=' flex-1'>
          <p className={`${ia ? ' bg-purple-700' : ' bg-green-700'} rounded-md p-4`}>
            {loading ? <Loading /> : messageList}
          </p>
        </div>
      </article>
    </motion.div>
  )
}
