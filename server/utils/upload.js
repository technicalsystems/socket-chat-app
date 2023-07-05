import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const dirnamePath = dirname(fileURLToPath(import.meta.url))
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, $$, cb) => {
      const roomId = req.headers['x-room-id']
      const dirPath = join(dirnamePath, '../files', roomId)

      if ( !existsSync(dirPath) ) {
        mkdirSync(dirPath, { recursive: true })
      }

      cb(null, dirPath)

    },
    filename: ($$, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
  })
})

export default upload