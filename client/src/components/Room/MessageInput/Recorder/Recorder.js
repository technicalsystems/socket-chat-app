import useStore from '../../../../hooks/useStore'
import { useState, useContext } from 'react'
import { AttachContext } from '../../../../utils/context';
import RecordingModal from './RecordingModal'
import MicRoundedIcon from '@mui/icons-material/MicRounded';

export default function Recorder() {

  const showPreview = useStore(({ showPreview }) => showPreview)
  const [ showModal, setShowModal ] = useState(false)
  const [ ,setShowAttachment ] = useContext(AttachContext)

  return (
    <div className='container recorder'>
      <button
        type='button'
        className='btn'
        onClick={() => {
          setShowModal(true)
          false && setShowAttachment(true)
        }}
        disabled={showPreview}
        style={{
          color: '#F7FAFC', 
          backgroundColor: 'rgb(22, 124, 191)', 
          filter: 'grayscale(0.3)',
          border: 'none',
          outline: 'none',
          width: '30px',
          height: '30px',
          borderRadius: '4px'
        }}
      >
        <MicRoundedIcon fontSize={"small"} style={{ width: '18px', marginTop: '3px' }}/>
      </button>

      { showModal && <RecordingModal setShowModal={setShowModal} /> }
    
    </div>
  )
}