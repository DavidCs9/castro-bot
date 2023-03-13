import { useMessageStore } from '@/store/messages'
import { motion } from 'framer-motion'

export function DeleteButton () {
  const deleteMessages = useMessageStore(state => state.deleteMessages)
  const handleDeleteChat = (event) => {
    deleteMessages()
    event.preventDefault()
  }
  return (
    <div className='w-full flex justify-center mb-6'>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDeleteChat} className='flex items-center px-6 py-2  transition ease-in duration-200 uppercase rounded-full
       hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none'
      >
        <i class='fa-regular fa-trash-can pr-3' />
        Restart Chat
      </motion.button>
    </div>
  )
}
