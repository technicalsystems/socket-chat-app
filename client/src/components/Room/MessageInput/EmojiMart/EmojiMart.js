import { Picker } from 'emoji-mart'
// ----------------------------------------------------------------
// import 'emoji-mart/css/emoji-mart.css'
// ----------------------------------------------------------------
import useStore from '../../../../hooks/useStore'
import { useCallback, useEffect } from 'react'
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded'

export default function EmojiMart({ setText, messageInput }) {

  const { showEmoji, setShowEmoji, showPreview } = useStore(
    ({ showEmoji, setShowEmoji, showPreview }) => ({
      showEmoji,
      setShowEmoji,
      showPreview
    })
  )

  const onKeydown = useCallback(
    (e) => {
      if ( e.key === 'Escape' ) {
        setShowEmoji(false)
      }
    }, [ setShowEmoji ]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [ onKeydown ])

  const onSelect = ({ native }) => {
    setText((text) => text + native)
    messageInput.focus()
  }

  return (
    <div className='container emoji'>
      <button
        className='btn'
        type='button'
        onClick={() => setShowEmoji(!showEmoji)}
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
        <EmojiEmotionsRoundedIcon fontSize={"small"} style={{ width: '16px' }}/>
      </button>
      { showEmoji && (
        <Picker
          onSelect={onSelect}
          emojiSize={20}
          showPreview={false}
          perLine={6}
        />
      )}
    </div>
  )
}