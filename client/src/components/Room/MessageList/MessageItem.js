import { SERVER_URI, USER_KEY } from '../../../constants'
import React, { useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'
import TimeAgo from 'react-timeago'
import storage from '../../../utils/storage'
import css from '../../../styles/styles.css'

import semiMenu from '../../../image/semiMenu.svg'
import HeadsetIcon from '@mui/icons-material/Headset'
import DeleteIcon from '@mui/icons-material/Delete'

const { RoomCSS } = css

export default function MessageItem({ message, removeMessage }) {

  const [ menuActive, setMenuActive ] = useState(false)

  // ----------------------------------------------------------------
  // извлекаем данные пользователя из локального хранилища
  // ----------------------------------------------------------------
  const user = storage.get(USER_KEY)
  // ----------------------------------------------------------------
  // утилиты для перевода текста в речь
  // ----------------------------------------------------------------
  const { speak, voices } = useSpeechSynthesis()
  // ----------------------------------------------------------------
  // определяем язык приложения
  // ----------------------------------------------------------------
  const lang = document.documentElement.lang || 'en'
  // ----------------------------------------------------------------
  // мне нравится голос от гугла
  // ----------------------------------------------------------------
  const voice = voices.find(
    (v) => v.lang.includes(lang) && v.name.includes('Google')
  )

  let element
  // ----------------------------------------------------------------
  // извлекаем из сообщения тип и текст или путь к файлу
  // ----------------------------------------------------------------
  const { messageType, textOrPathToFile } = message
  // ----------------------------------------------------------------
  // формируем абсолютный путь к файлу
  // ----------------------------------------------------------------
  const pathToFile = `${SERVER_URI}/files${textOrPathToFile}`
  // ----------------------------------------------------------------
  // определяем элемент для рендеринга на основе типа сообщения
  // ----------------------------------------------------------------
  switch (messageType) {
    case 'text':
      element = (
        <React.Fragment>
          <p>{ textOrPathToFile }</p>
          { false && <button
            className='btn'
            // ----------------------------------------------------------------
            // озвучиваем текст при нажатии кнопки
            // ----------------------------------------------------------------
            onClick={() => speak({ text: textOrPathToFile, voice })}
            style={{
              display: 'block',
              position: 'relative',
              width: '30px',
              height: '30px',
              boxSizing: 'border-box',
            }}
          >
            <HeadsetIcon fontSize={"small"}/>
          </button> }
        </React.Fragment>
      )
      break
    case 'image':
      element = <img src={pathToFile} alt='' />
      break
    case 'audio':
      element = <audio src={pathToFile} controls></audio>
      break
    case 'video':
      element = <video src={pathToFile} controls></video>
      break
    default:
      return null
  }

  // ----------------------------------------------------------------
  // определяем принадлежность сообщения текущему пользователю
  // ----------------------------------------------------------------
  const isMyMessage = user.userId === message.userId

  const changeMenuActive = () => setMenuActive(!menuActive)

  return (
    <RoomCSS.MessageItem
      style={{ alignSelf: isMyMessage ? 'flex-end' : 'flex-start', marginBottom: '12px' }} 
      className={`item message ${isMyMessage ? 'my' : ''}`}
    >

      { false && <p className='username'>{ isMyMessage ? 'Мое сообщение' : message.userName }</p> }

      { isMyMessage && <img
        alt={""}
        src={semiMenu}
        onClick={changeMenuActive}
        style={{
          display: 'block',
          position: 'absolute',
          left: '100%',
          top: '0%',
          width: '20px',
          marginLeft: '-33px',
          marginTop: '13px',
          cursor: 'pointer',
          border: menuActive 
            ? '1px solid var(--blue-3, #D9E7F0)'
            : '1px solid transparent',
          borderRadius: '50%'
        }}
      /> }

      <div style={{ width: '80%' }} className='inner'>
        { element }
        { menuActive && <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',   
            marginTop: '16px'
          }}
        >
          { isMyMessage && (
            <button
              className='btn'
              // ----------------------------------------------------------------
              // озвучиваем текст при нажатии кнопки
              // ----------------------------------------------------------------
              onClick={() => speak({ text: textOrPathToFile, voice })}
              style={{
                display: 'block',
                position: 'relative',
                width: '26px',
                height: '26px',
                boxSizing: 'border-box',
                backgroundColor: '#167CBF',
                outline: 'none',
                border: 'none',
                borderRadius: '4px',
                color: '#F7FAFC',
                marginRight: '10px',
                cursor: 'pointer',
              }}
            >
              <HeadsetIcon fontSize={"small"} style={{ width: '16px', marginTop: '3px' }}/>
            </button>
          )}
          { isMyMessage && (
            <button 
              className='btn' 
              onClick={() => removeMessage(message)}
              style={{
                display: 'block',
                position: 'relative',
                width: '26px',
                height: '26px',
                boxSizing: 'border-box',
                backgroundColor: '#167CBF',
                outline: 'none',
                border: 'none',
                borderRadius: '4px',
                color: '#F7FAFC',
                cursor: 'pointer',
              }}
            >
              <DeleteIcon fontSize={"small"} style={{ width: '16px', marginTop: '1px' }}/>
            </button>
          )}
        </div> }
      </div>
      <span
        className='datetime' 
        style={ isMyMessage ? { 
          display: 'block',
          position: 'absolute',
          color: '#8E9DA7', 
          fontSize: '12px',
          left: '0px',
          top: '100%',
          width: '20%',
          marginTop: '-22px',
          marginLeft: '-20%',
          textAlign: 'right',
          paddingRight: '14px'
        } : { 
          display: 'block',
          position: 'absolute',
          color: '#8E9DA7', 
          fontSize: '12px',
          left: '100%',
          top: '100%',
          width: '20%',
          marginTop: '-22px',
          textAlign: 'left',
          paddingLeft: '14px'
        }}
      >
        <TimeAgo date={message.createdAt}/>
      </span>
    </RoomCSS.MessageItem>
  )
}