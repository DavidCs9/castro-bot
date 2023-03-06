import { useEffect, useState } from 'react'

export function TypingEffect ({ text }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setcurrentIndex] = useState(0)

  useEffect(() => {
    if (!text?.length) return

    const randomTime = Math.floor(Math.random() * 20) + 10

    const intervalId = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(intervalId)
        return
      }

      const nextIndex = text.indexOf(' ', currentIndex + 1)
      if (nextIndex < 0 || nextIndex >= text.length) {
        setDisplayText(text)
        setcurrentIndex(text.length)
      } else {
        setDisplayText(text.slice(0, nextIndex))
        setcurrentIndex(currentIndex + 1)
      }
    }, randomTime)

    return () => clearInterval(intervalId)
  }, [text, currentIndex])

  return (
    <p>{displayText}</p>
  )
}
