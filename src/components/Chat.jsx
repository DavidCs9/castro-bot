import { useMessageStore } from '@/store/messages'
import { ChatForm } from './ChatForm'
import { Message } from './Message'
import { DeleteButton } from './DeleteButton'
import { motion, AnimatePresence } from 'framer-motion'
export function Chat () {
  const messages = useMessageStore(state => state.messages)
  const deletebtn = useMessageStore(state => state.deletebtn)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5
      }}
      className='flex flex-col flex-1'
    >
      <ChatForm />
      <main id='chat' className=''>
        <AnimatePresence>
          {messages.map((entry, index) => (
            <Message key={entry.id} {...entry} index={index} />
          ))}
          {deletebtn
            ? <DeleteButton />
            : ''}
        </AnimatePresence>
      </main>
    </motion.div>

  )
}
