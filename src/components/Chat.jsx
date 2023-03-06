import { useMessageStore } from '@/store/messages'
import { ChatForm } from './ChatForm'
import { Message } from './Message'
import { DeleteButton } from './DeleteButton'
import { motion, AnimatePresence } from 'framer-motion'
export function Chat () {
  const messages = useMessageStore(state => state.messages)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5
      }}
      className='flex flex-col h-full flex-1'
    >
      <ChatForm />
      <main id='chat' className=' mt-[180px]'>
        <AnimatePresence>
          {messages.map((entry, index) => (
            <Message key={entry.id} {...entry} index={index} />
          ))}
        </AnimatePresence>
        <DeleteButton />
      </main>
    </motion.div>

  )
}
