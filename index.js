import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import cloudinaryAccess from './src/utils/connectCloudinary.js'
import { config } from 'dotenv'
import createUniqueString from './src/utils/createUniqueString.js'
import { v2 as cloudinary } from 'cloudinary'
import globalErrorHandler from './src/middlewares/globalErrorHandler.js'
config()
const app = express()

app.use(express.json())
cloudinaryAccess()

// 🟢 api=>  http://localhost:3000/createFolder
app.post(
  '/createFolder',
  expressAsyncHandler(async (req, res, next) => {
    const { folderPath } = req.body
    const uniqueString = createUniqueString()
    const createFolder = await cloudinary.api.create_folder(
      folderPath ? folderPath : `${uniqueString}`
    )
    if (!createFolder.success) {
      return next(new Error('Failed while creating folder', { cause: 500 }))
    }
    res.status(201).json({ message: 'create Folder', createFolder })
  })
)

// 🟢 api=> http://localhost:3000/deleteFolder
app.delete(
  '/deleteFolder',
  expressAsyncHandler(async (req, res, next) => {
    const { folderPath } = req.body
    if (!folderPath) {
      return next(new Error('Please Send the folder path.', { cause: 400 }))
    }

    try {
      const deletedFolders = await cloudinary.api.delete_folder(folderPath)
      return res.status(200).json({ message: 'Delete Folder', deletedFolders })
    } catch (err) {
      return next(
        new Error(
          `no folder with this name '${folderPath}', please check the folder name and try again`,
          { cause: 400 }
        )
      )
    }
  })
)

app.use('*', (req, res, next) => {
  return next(new Error('Invalid URL', { cause: 400 }))
})
app.use(globalErrorHandler)
app.listen(3000, () => console.log('Server is on 3000 🔥'))
