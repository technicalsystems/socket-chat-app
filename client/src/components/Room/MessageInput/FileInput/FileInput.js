import useStore from '../../../../hooks/useStore'
import { useEffect, useRef } from 'react'
import FilePreview from './FilePreview'
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import css from '../../../../styles/styles.css'

const { RoomCSS } = css

export default function FileInput() {

  const { file, setFile } = useStore(({ file, setFile }) => ({ file, setFile }))
  const inputRef = useRef()

  useEffect(() => {
    
    if ( !file ) { inputRef.current.value = '' }
  
  }, [ file ])

  return (
    <RoomCSS.MessageInputComponentButtonContainer style={{ marginLeft: '4px', marginRight: '4px' }}>
      <input
        type='file'
        accept='image/*, audio/*, video/*'
        onChange={(e) => setFile(e.target.files[0])}
        ref={inputRef}
        style={{ display: 'block', position: 'absolute', visibility: 'hidden' }}
      />
      <button
        type='button'
        className='btn'
        onClick={() => inputRef.current.click()}
        style={{ 
          color: '#F7FAFC', 
          backgroundColor: 'rgb(22, 124, 191)', 
          filter: 'grayscale(0.3)',
          border: 'none',
          outline: 'none',
          width: '30px',
          height: '30px',
          borderRadius: '4px',
          display: 'block',
          position: 'absolute',
        }}
      >
        <InsertDriveFileRoundedIcon fontSize={"small"} style={{ width: '16px', marginTop: '1px' }}/>
      </button>

      { file && <FilePreview /> }
      
    </RoomCSS.MessageInputComponentButtonContainer>
  )
}