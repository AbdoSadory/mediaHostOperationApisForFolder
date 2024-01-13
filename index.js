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

app.delete(
  '/deleteFolder',
  expressAsyncHandler(async (req, res, next) => {
    const { folderPath } = req.body
    if (!folderPath) {
      return next(
        new Error('Please Send the folder path right. ', { cause: 400 })
      )
    }

    // let subFoldersPaths = []
    // const subFolders = await cloudinary.api.sub_folders('main')
    // for (const folder of subFolders['folders']) {
    //   subFoldersPaths.push(folder['path'])
    // }
    // console.log(subFoldersPaths)
    // for (const subFolderPath of subFoldersPaths) {
    //   console.log(subFolderPath)
    //   await cloudinary.api.delete_folder(subFolderPath)
    // }
    // cloudinary.api.delete_folder(to_delete[i])
    try {
      await cloudinary.api.delete_folder('maidflkn')
    } catch (err) {
      return next(new Error('no folder with this name', { cause: 400 }))
    }

    // console.log(deleteFolder)
    // if (!Object.keys(deleteFolder).length) {
    //   return next(
    //     new Error(
    //       'no folder has been deleted, please check the folder name and try again',
    //       { cause: 400 }
    //     )
    //   )
    // }
    res
      .status(200)
      .json({ message: 'Delete Folder', deleteFolder: deleteFolder })
  })
)

app.use('*', (req, res, next) => {
  return next(new Error('Invalid URL', { cause: 400 }))
})
app.use(globalErrorHandler)
app.listen(3000, () => console.log('Server is on 3000 🔥'))
