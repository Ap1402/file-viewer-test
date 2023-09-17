import { StatusCodes } from 'http-status-codes'
import { FileService } from '../services/files.service.js'
import FilesRepository from '../repositories/files.repository.js'

export const getFileData = async (req, res) => {
  const { fileName } = req.query
  const fileClient = new FileService(FilesRepository)

  let filesData
  try {
    if (fileName) {
      filesData = await fileClient.downloadByNames([fileName])
    } else {
      filesData = await fileClient.downloadAllFiles()
    }
    return res.status(StatusCodes.OK).json(filesData)
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong'
    })
  }
}
