import useChat from '../../hooks/useChat'
import MessageInput from './MessageInput/MessageInput'
import MessageList from './MessageList/MessageList'
import UserList from './UserList/UserList'

import css from '../../styles/styles.css'

const { RoomCSS } = css

export const Room = () => {
  
  const { users, messages, log, sendMessage, removeMessage } = useChat()

  return (
    <RoomCSS.ChatContainer>
      <UserList users={users}></UserList>
      <div style={{ width: '100%', marginTop: '20px' }}>
        <MessageList
          log={log}
          messages={messages}
          removeMessage={removeMessage}
        />
        <MessageInput sendMessage={sendMessage} />
      </div>
    </RoomCSS.ChatContainer>
  )
}