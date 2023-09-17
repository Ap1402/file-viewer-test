import Logger from '../config/logger-config.js'
import neatCsv from 'neat-csv'

export class FileService {
  filesRepository

  constructor (filesRepository) {
    this.filesRepository = filesRepository
  }

  getValidLines (rows) {
    return rows.reduce((validRows, row) => {
      if (row.file && row.text && row.number && row.hex) {
        validRows.push({
          text: row.text,
          number: row.number,
          hex: row.hex
        })
      }
      return validRows
    }, [])
  }

  async parseCsvToResponse (csvData, fileName) {
    try {
      const rows = await neatCsv(csvData)
      const lines = this.getValidLines(rows)

      return { file: fileName, lines }
    } catch (error) {
      Logger.error(`Error parsing: ${fileName}`)
      throw error
    }
  }

  filterSuccessfulAndEmptyFiles (results) {
    return results.filter(
      ({ status, value }) =>
        status === 'fulfilled' &&
        value?.file?.lines &&
        value.file.lines.length > 0
    )
  }

  async downloadParseFilesBatch (names) {
    return Promise.allSettled(
      names.map(async fileName => {
        try {
          const file = await this.filesRepository.fetchFileByName(fileName)
          const parsedFile = await this.parseCsvToResponse(file, fileName)

          return {
            status: 'fulfilled',
            file: parsedFile
          }
        } catch (error) {
          Logger.error(
            `Not able to download: ${fileName} ${JSON.stringify(
              error.response.data
            )}`
          )
          // should throw instead of try to return {status: 'rejected'}.
          throw error
        }
      })
    )
  }

  async downloadAllFiles () {
    try {
      const { files: fileNames } = await this.filesRepository.fetchFileNames()

      return this.downloadByNames(fileNames)
    } catch (error) {
      // just log with console.error if there is no custom format for error instances set.
      console.error(error)
      Logger.error(
        `[${this.constructor.name}/${this.downloadAllFiles.name}] Something unexpected Happened}`
      )
      throw error
    }
  }

  async downloadByNames (names) {
    try {
      const results = await this.downloadParseFilesBatch(names)
      const successfulFiles = this.filterSuccessfulAndEmptyFiles(results)

      const files = successfulFiles.map(file => file.value.file)

      return files
    } catch (err) {
      // just log with console.error if there is no custom format for error instances set.
      console.error(err)
      Logger.error(
        `[${this.constructor.name}/${this.downloadByNames.name}] Something unexpected Happened`
      )
      throw err
    }
  }
}
