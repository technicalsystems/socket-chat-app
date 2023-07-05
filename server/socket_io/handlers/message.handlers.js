import onError from '../../utils/onError.js'
const messages = {}

export default function messageHandlers(io, socket) {
  const { roomId } = socket

  const updateMessageList = () => {
    io.to(roomId).emit('message_list:update', messages[roomId])
  }

  socket.on('message:get', async () => {
    try {
      const messagesArr = []
      messages[roomId] = messagesArr
      updateMessageList()
    } catch (e) {
      onError(e)
    }
  })

  socket.on('message:add', (message) => {
    message.createdAt = Date.now()
    messages[roomId].push(message)
    updateMessageList()
  })

  socket.on('message:remove', (message) => {

    const { messageId, messageType, textOrPathToFile } = message

    messages[roomId] = messages[roomId].filter((m) => m.messageId !== messageId)
    updateMessageList()
  })
}