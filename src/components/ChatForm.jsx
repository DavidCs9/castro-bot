import { useMessageStore } from '@/store/messages'
import { useRef } from 'react'
import { SendIcon } from './Icons'
import { motion } from 'framer-motion'

export function ChatForm () {
  const sendPrompt = useMessageStore(state => state.sendPrompt)
  const textAreaRef = useRef()
  const messages = useMessageStore(state => state.messages)

  const handleSubmit = (event) => {
    let prompts = ''
    messages.map((entry) => (
      prompts += entry.message
    ))

    prompts += textAreaRef.current.value
    event.preventDefault()
    sendPrompt({ prompt: prompts, userPrompt: textAreaRef.current.value })
    textAreaRef.current.value = ''
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      className='w-full'
    >
      <section className=' m-auto w-11/12 pt-4 lg:w-4/6'>
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className=' w-full m-auto'
        >
          <div
            className='relative flex flex-col py-4 px-4 flex-grow
           text-white bg-gptlightgray rounded-md '
          >
            <textarea
              ref={textAreaRef}
              rows={1}
              tabIndex={0}
              autoFocus
              defaultValue=''
              placeholder='En que te puedo ayudar David'
              className='h-[24px] resize-none bg-transparent border-0 outline-none'
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute p-1 rounded-md bottom-2.5 right-2.5'
            >
              <SendIcon />
            </motion.button>
          </div>
        </form>
      </section>
    </motion.div>
  )
}
