import useStore from '../../../../hooks/useStore'
import { useRef, useState } from 'react'
import { BsFillPauseFill, BsFillPlayFill, BsFillStopFill } from 'react-icons/bs'
import {
  audioConstraints,
  isRecordingStarted,
  pauseRecording,
  resumeRecording,
  startRecording,
  stopRecording,
  videoConstraints
} from '../../../../utils/recording'
import css from '../../../../styles/styles.css'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const { RoomCSS } = css

export default function RecordingModal({ setShowModal }) {

  const setFile = useStore(({ setFile }) => setFile)
  const [ constraints, setConstraints ] = useState(audioConstraints)
  const [ constraintsLabel, setConstraintsLabel ] = useState(audioConstraints)
  const [ recording, setRecording ] = useState(false)

  const selectBlockRef = useRef()
  const videoRef = useRef()

  const onChange = ({ target: { value } }) =>
    value === 'audio'
      ? setConstraints(audioConstraints)
      : setConstraints(videoConstraints)

  const pauseResume = () => {
    if ( recording ) {
      pauseRecording()
    } else {
      resumeRecording()
    }
    setRecording(!recording)
  }

  const start = async () => {
    if (isRecordingStarted()) {
      return pauseResume()
    }

    const stream = await startRecording(constraints)
    setRecording(true)

    selectBlockRef.current.style.display = 'none'
    if ( constraints.video && stream ) {
      videoRef.current.style.display = 'block'
      videoRef.current.srcObject = stream
    }
  }

  const stop = () => {

    const file = stopRecording()
    setRecording(false)
    setFile(file)
    setShowModal(false)

  }

  return (
    <RoomCSS.MessageInputComponentFilesModal
      className='overlay'
      onClick={(e) => {
        if ( e.target.className !== 'overlay' ) return
        setShowModal(false)
      }}
    >
      <div className='modal'>
        <div ref={selectBlockRef}>

          <h2>Выберите тип вложения</h2>
          
          <select onChange={onChange}>
            <option value='audio'>Аудио вложение</option>
            <option value='video'>Видео вложение</option>
          </select>
          
          { false && <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={constraintsLabel}
            onChange={onChange}
          >
            <FormControlLabel 
              value="audio" 
              control={<Radio size='small' />} 
              label="Голосовое сообщение"
              sx={{
                marginTop: '0px',
                marginBottom: '0px',
                fontSize: '13px',
                '& .MuiSvgIcon-root': {},
              }} 
            />
            <FormControlLabel 
              value="video" 
              control={<Radio size='small' />} 
              label="Видесообщение" 
              sx={{
                marginTop: '0px',
                marginBottom: '0px',
                fontSize: '13px',
                '& .MuiSvgIcon-root': {},
              }} 
            />
          </RadioGroup> }

        </div>

        { isRecordingStarted() && <p>{ recording ? 'Запись сообщения..' : 'Запись на паузе' }</p> }

        <video ref={videoRef} autoPlay muted />

        <div className='controls'>
          <button className='btn play' onClick={start}>
            { recording ? (
              <BsFillPauseFill className='icon' />
            ) : (
              <BsFillPlayFill className='icon' />
            )}
          </button>
          { isRecordingStarted() && (
            <button className='btn stop' onClick={stop}>
              <BsFillStopFill className='icon' />
            </button>
          )}
        </div>
      </div>
    </RoomCSS.MessageInputComponentFilesModal>
  )
}