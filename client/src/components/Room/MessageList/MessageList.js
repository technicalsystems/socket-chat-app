import { useEffect, useRef } from 'react'
import MessageItem from './MessageItem'
import css from '../../../styles/styles.css'

const { RoomCSS } = css

export default function MessageList({ log, messages, removeMessage }) {

  const logRef = useRef()
  const bottomRef = useRef()

  useEffect(() => {
    bottomRef.current.scrollIntoView({
      behavior: 'smooth'
    })
  }, [ messages ])

  useEffect(() => {
    if ( log ) {
      logRef.current.style.opacity = 0.8
      logRef.current.style.zIndex = 1

      const timerId = setTimeout(() => {
        logRef.current.style.opacity = 0
        logRef.current.style.zIndex = -1

        clearTimeout(timerId)
      }, 1500)
    }
  }, [ log ])

  return (
    <RoomCSS.MessagesContainer>
      <RoomCSS.MessageList className='list message'>
        { messages.map((message) => (
          <MessageItem
            key={message.messageId}
            message={message}
            removeMessage={removeMessage}
          />
        ))}

        <p ref={bottomRef}></p>
        <p ref={logRef} className='log' style={{ color: 'red' }}>{ log }</p>
      </RoomCSS.MessageList>
    </RoomCSS.MessagesContainer>
  )
}