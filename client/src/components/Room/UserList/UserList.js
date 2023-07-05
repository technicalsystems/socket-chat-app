import { AiOutlineUser } from 'react-icons/ai'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

import css from '../../../styles/styles.css'
import avatar from '../../../image/avatar.svg'

const { RoomCSS } = css

export default function UserList({ users }) {

  const CustomTextField = styled(TextField)({
    '& .MuiInputLabel-root': {}, 
    // ----------------------------------------------------------------
    // placeholder стилизуется в строке выше
    // ----------------------------------------------------------------
    '& .MuiInputLabel-shrink': {
      marginLeft: '0px',
    },
    '& .MuiInputBase-input': {
      fontSize: '15px',
    },
    '& .MuiOutlinedInput-input': {
      paddingBottom: '18px',
    },
    '& .MuiInput-root:before': {
      borderBottom: '1px solid #2E2E2E',
      fontSize: '15px'
    },
    '& .MuiFormLabel-root': {
      fontSize: '15px',
      marginLeft: '2px',
      marginTop: '-3px',
    },
    '& label.Mui-focused': {
      color: '#2E2E2E',
    },
    '& .MuiInput-underline:after': {
      display: 'none',
      borderBottomColor: '#2E2E2E',
    },
    '& .MuiOutlinedInput-root': {
      height: '50px',
        '& fieldset': {},
        '&:hover fieldset': {},
        '&.Mui-focused fieldset': {
          borderColor: '#167CBF'
        },
    },
  })

  return (
    <RoomCSS.UsersContainer>
      <RoomCSS.ChatHeaderUsersContainer className='list user'>
        { users.filter((item, index) => index === 0).map(({ userId, userName }) => (
          
          <RoomCSS.ChatHeaderUserLine key={userId}>
            <img
              alt={""}
              src={avatar}
            />
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                position: 'relative',
                width: '100%',
                marginLeft: '20px'
              }}
            >
              <span 
                style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  fontSize: '15px', 
                  width: '100%', 
                  marginBottom: '3px' 
                }}
              >
                 
                 username select: { !!!false && userName }

              </span>
              <span 
                style={{ 
                  display: 'block', 
                  fontSize: '12px', 
                  color: 'grey' 
                }}
              >
                
                {"Находился в сети [ options download ] "}

              </span>
              <span>{ false && <AiOutlineUser className='icon user'></AiOutlineUser> }</span>
            </div>
          </RoomCSS.ChatHeaderUserLine>
        
        ))}
      </RoomCSS.ChatHeaderUsersContainer>
      <CustomTextField 
        type={'text'}
        value={""}
        onChange={() => {}}
        id="standard-basic-outline" 
        label={'Поиск участника или сообщения'}
        error={false}
        disabled={true}
        autoComplete={"off"}
        style={{
          ...css,
          width: '40%'
        }} 
      />
    </RoomCSS.UsersContainer>
  )
}