import { TypingEffect } from '@/components/TypingEffect'

export function Message ({ ia, message }) {
  const avatar = ia ? <IaAvatar /> : <UserAvatar />
  const textElement = ia ? <TypingEffect text={message} /> : message
  return (
    <div>
      <article className='flex gap-4 p-6 m-auto max-w-3xl text-gray-100 '>
        <figure className={`${ia ? ' bg-purple-700' : ' bg-black'} w-8 h-8 flex items-center justify-center rounded-md`}>
          {avatar}
        </figure>
        <div className=' flex-1'>
          <p className={`${ia ? ' bg-purple-700' : ' bg-green-700'} rounded-md p-4`}>{textElement}</p>
        </div>
      </article>
    </div>
  )
}
