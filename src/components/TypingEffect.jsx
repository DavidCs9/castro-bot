import { useEffect, useState } from 'react'

export function TypingEffect ({ text }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setcurrentIndex] = useState(0)
  const [showCursor, setshowCursor] = useState(true)

  useEffect(() => {
    if (!text?.length) return

    const randomTime = Math.floor(Math.random() * 20) + 5

    const intervalId = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(intervalId)
        setshowCursor(false)
        return
      }

      const nextIndex = text.indexOf(' ', currentIndex + 1)
      if (nextIndex < 0) {
        setDisplayText(text)
        setcurrentIndex(text.length)
      }

      setDisplayText(text.slice(0, nextIndex))
      setcurrentIndex(currentIndex + 1)
    }, randomTime)

    return () => clearInterval(intervalId)
  }, [text, currentIndex])

  return (
    <span className={`${showCursor ? 'after:content-["┃"] after:ml-1 after:animate-pulse' : ''}`}>{displayText}</span>
  )
}
