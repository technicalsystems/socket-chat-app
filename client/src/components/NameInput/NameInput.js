import { USER_KEY } from '../../constants'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import storage from '../../utils/storage'

export const NameInput = () => {
  const [ formData, setFormData ] = useState({
    userName: '',
    roomId: 'main_room'
  })

  const [ submitDisabled, setSubmitDisabled ] = useState(true)

  useEffect(() => {
    const isSomeFieldEmpty = Object.values(formData).some((v) => !v.trim())
    setSubmitDisabled(isSomeFieldEmpty)
  }, [ formData ])

  const onChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = (e) => {

    e.preventDefault()
    if (submitDisabled) return

    const userId = nanoid()

    storage.set(USER_KEY, {
      userId,
      userName: formData.userName,
      roomId: formData.roomId
    })

    window.location.reload()

  }

  return (
    <div className='container name-input'>
      <h2>Биржа проектировщиков чат</h2>
      <form onSubmit={onSubmit} className='form name-room'>
        <div>
          <label htmlFor='userName'>Введите имя пользователя</label>
          <input
            type='text'
            id='userName'
            name='userName'
            minLength={2}
            required
            value={formData.userName}
            onChange={onChange}
          />
        </div>
        <div class='visually-hidden'>
          <label htmlFor='roomId'>Введите taskID или userID</label>
          <input
            type='text'
            id='roomId'
            name='roomId'
            minLength={4}
            required
            value={formData.roomId}
            onChange={onChange}
          />
        </div>
        <button disabled={submitDisabled} className='btn chat'>Начать общение</button>
      </form>
    </div>
  )
}