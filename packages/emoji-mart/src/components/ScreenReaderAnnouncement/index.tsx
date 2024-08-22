import { useEffect, useState } from 'preact/hooks'

type Level = 'assertive' | 'polite'

type AnnouncementProps = {
  text: string
  level: Level
  delay: number
  timeout: number
}

/**
 * Component which will cause a screen reader to announce a message when required.
 */
const ScreenReaderAnnouncement = ({
  delay = 1500,
  level,
  text,
  timeout = 2000,
}: AnnouncementProps) => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    let timer = setTimeout(() => {
      setMessage(text)

      timer = setTimeout(() => {
        setMessage('')
      }, timeout)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [delay, text, timeout])

  return (
    <div aria-live={level} className="sr-only" aria-atomic="true">
      {message}
    </div>
  )
}

export default ScreenReaderAnnouncement
