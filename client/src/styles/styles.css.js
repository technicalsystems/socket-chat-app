import styled from 'styled-components'

const css = {
  AppWrapper: styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    width: 1100px;
    height: auto;
  `,
  RoomCSS: {
    ChatContainer: styled.section`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
      box-sizing: border-box;
      width: 77%;
      height: auto;
      background-color: White;
      border-radius: 8px;
      padding: 30px;
    `,
    UsersContainer: styled.aside`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      width: 100%;
    `,
    MessagesContainer: styled.aside`
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      width: 100%;
      height: 600px;
      border: 1px solid var(--blue-3, #D9E7F0);
      border-radius: 4px;
      padding: 14px;
    `,
    MessageList: styled.div`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;
      width: 100%;
    `,
    MessageItem: styled.div`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      width: 80%;
      background-color: #F7FAFC;
      border-radius: 6px;
      font-size: 13px;
      padding: 18px;
    `,
    ChatHeaderUsersContainer: styled.div`
      display: flex;
      position: relative;
      width: 60%;
    `,
    ChatHeaderUserLine: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      width: 100%;
    `,
    MessageInputComponent: styled.input`
      display: block;
      position: relative;
      width: ${props => props.width}%;
      height: 50px;
      border-radius: 4px;
      font-size: 15px;
      padding-left: 13px;
      padding-bottom: 2px;
      margin-left: 10px;
      margin-right: 12px;
      border: 1px solid var(--blue-3, #D9E7F0);
      outline: none;
    `,
    MessageInputComponentForm: styled.form`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      position: relative;
      width: 100%;
      margin-top: 12px;
    `,
    MessageInputComponentButtonContainer: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      width: 40px;
      height: 40px;
    `,
    MessageInputComponentFilesModal: styled.div`
      display: block;
      position: relative;
      box-sizing: border-box;
      padding-left: 10px;
    `
  }
}

export default css