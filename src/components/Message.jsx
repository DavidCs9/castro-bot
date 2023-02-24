import { IaAvatar } from './IsAvatar'
import { UserAvatar } from './UserAvatar'
import { TypingEffect } from './TypingEffect'
import { Loading } from './Loading'

export function Message ({ ia, message, loading }) {
  const avatar = ia ? <IaAvatar /> : <UserAvatar />
  const lines = message.split('\n')
  const messageList = lines.map((line, index) => (
    <p key={index}>{ia ? <TypingEffect text={line} /> : message}</p>
  ))

  return (
    <div>
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
    </div>
  )
}
