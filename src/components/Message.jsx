import { IaAvatar } from './IsAvatar'
import { UserAvatar } from './UserAvatar'
import { TypingEffect } from './TypingEffect'
import { Loading } from './Loading'
import { motion } from 'framer-motion'

export function Message ({ ia, message, loading }) {
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
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      x: 1000,
      transition: {
        duration: 0.5
      }
    }
  }

  return (

    <motion.div
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={list}
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
