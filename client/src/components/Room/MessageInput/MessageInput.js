import fileApi from '../../../api/file.api'
import { USER_KEY } from '../../../constants'
import useStore from '../../../hooks/useStore'
import { nanoid } from 'nanoid'
import { useEffect, useRef, useState, useContext } from 'react'
import { AttachContext } from '../../../utils/context'
import storage from '../../../utils/storage'
import EmojiMart from './EmojiMart/EmojiMart'
import FileInput from './FileInput/FileInput'
import Recorder from './Recorder/Recorder'
import css from '../../../styles/styles.css'
import SendRoundedIcon from '@mui/icons-material/SendRounded'

const { RoomCSS } = css

export default function MessageInput({ sendMessage }) {

  const user = storage.get(USER_KEY)
  const state = useStore((state) => state)
  const {
    file,
    setFile,
    showPreview,
    setShowPreview,
    showEmoji,
    setShowEmoji
  } = state

  const [ text, setText ] = useState('')
  const [ submitDisabled, setSubmitDisabled ] = useState(true)
  const [ showAttachment, ] = useContext(AttachContext)

  const inputRef = useRef()

  useEffect(() => {
    setSubmitDisabled(!text.trim() && !file)
  }, [ text, file ])

  useEffect(() => {
    setShowPreview(file)
  }, [ file, setShowPreview ])

  const onSubmit = async (e) => {

    e.preventDefault()
    if (submitDisabled) return

    const { userId, userName, roomId } = user
    let message = {
      messageId: nanoid(),
      userId,
      userName,
      roomId
    }

    if ( !file ) {
      message.messageType = 'text'
      message.textOrPathToFile = text
    } else {
      try {
        const path = await fileApi.upload({ file, roomId })
        const type = file.type.split('/')[0]

        message.messageType = type
        message.textOrPathToFile = path
      } catch (e) {
        console.error(e)
      }
    }

    if ( showEmoji ) {
      setShowEmoji(false)
    }

    sendMessage(message)
    setText('')
    setFile(null)
  }

  return (
    <RoomCSS.MessageInputComponentForm onSubmit={onSubmit} className='form message'>
      <EmojiMart setText={setText} messageInput={inputRef.current} />
      <FileInput />
      <Recorder />
      <RoomCSS.MessageInputComponent
        width={showAttachment ? 50 : 70}
        type='text'
        autoFocus
        placeholder='Напишите ваше сообщение..'
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        disabled={showPreview}
      />
      <button 
        className='btn' 
        type='submit' 
        disabled={submitDisabled}
        style={{
          color: '#F7FAFC', 
          backgroundColor: 'rgb(22, 124, 191)', 
          filter: 'grayscale(0.3)',
          border: 'none',
          outline: 'none',
          width: '50px',
          height: '50px',
          borderRadius: '4px'
        }}
      >
        <SendRoundedIcon fontSize={"large"} style={{ width: '26px' }}/>
      </button>
    </RoomCSS.MessageInputComponentForm>
  )
}