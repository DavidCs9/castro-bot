import { useMessageStore } from '@/store/messages'
import { ChatForm } from './ChatForm'
import { Message } from './Message'
import { DeleteButton } from './DeleteButton'

export function Chat () {
  const messages = useMessageStore(state => state.messages)

  return (
    <div className='flex flex-col h-full flex-1'>
      <ChatForm />
      <main id='chat' className=' mt-[180px]'>
        {messages.map((entry) => (
          <Message key={entry.id} {...entry} />
        ))}
        <DeleteButton />
      </main>
    </div>
  )
}
