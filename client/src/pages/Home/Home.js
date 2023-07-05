import { NameInput, Room } from '../../components'
import { USER_KEY } from '../../constants'
import storage from '../../utils/storage'
import css from '../../styles/styles.css'

const { AppWrapper } = css

export const Home = () => {

  const user = storage.get(USER_KEY)
  return user 
    ? <AppWrapper>
        <Room></Room>
      </AppWrapper> 
    : <AppWrapper>
        <NameInput></NameInput>
      </AppWrapper>

}