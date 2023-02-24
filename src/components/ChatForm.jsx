import { useMessageStore } from '@/store/messages'
import { useRef } from 'react'
import { SendIcon } from './Icons'

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