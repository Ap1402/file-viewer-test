/* eslint-env mocha */
import { expect } from 'chai'
import sinon from 'sinon'
import { FileService } from '../src/services/files.service.js'

describe('FileService', () => {
  let fileService
  let filesRepository

  beforeEach(() => {
    filesRepository = {
      fetchFileByName: sinon.stub(),
      fetchFileNames: sinon.stub()
    }

    fileService = new FileService(filesRepository)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('parseCsvToResponse', () => {
    it('should parse CSV data to response', async () => {
      const csvData =
        'file,text,number,hex\nfile1.csv,RgTya,123,0123456789abcdef0123456789abcdef\nfile2.csv,Hello,456,abcdef0123456789abcdef0123456789'
      const fileName = 'test.csv'
      const response = await fileService.parseCsvToResponse(csvData, fileName)
      expect(response).to.deep.equal({
        file: fileName,
        lines: [
          {
            text: 'RgTya',
            number: '123',
            hex: '0123456789abcdef0123456789abcdef'
          },
          {
            text: 'Hello',
            number: '456',
            hex: 'abcdef0123456789abcdef0123456789'
          }
        ]
      })
    })

    it('should parse CSV data and skip missing information', async () => {
      // The last row is missing info
      const csvData =
        'file,text,number,hex\nfile1.csv,RgTya,123,0123456789abcdef0123456789abcdef\nfile2.csv,Hello,456,abcdef0123456789abcdef0123456789\nfile3.csv,Example,'
      const fileName = 'test.csv'
      const response = await fileService.parseCsvToResponse(csvData, fileName)
      expect(response).to.deep.equal({
        file: fileName,
        lines: [
          {
            text: 'RgTya',
            number: '123',
            hex: '0123456789abcdef0123456789abcdef'
          },
          {
            text: 'Hello',
            number: '456',
            hex: 'abcdef0123456789abcdef0123456789'
          }
        ]
      })
    })
  })

  describe('filterSuccessfulAndEmptyFiles', () => {
    it('should filter successful and not return empty files', () => {
      const results = [
        { status: 'fulfilled', value: { file: { lines: [] } } },
        { status: 'rejected', reason: 'Error' },
        { status: 'fulfilled', value: { file: { lines: [{ text: 'Text' }] } } }
      ]

      const filteredResults = fileService.filterSuccessfulAndEmptyFiles(results)

      expect(filteredResults).to.deep.equal([
        { status: 'fulfilled', value: { file: { lines: [{ text: 'Text' }] } } }
      ])
    })
  })

  describe('getValidLines', () => {
    it('should filter and return only lines that dont have missing data', () => {
      const rows = [
        { file: 'file1.csv', text: 'RgTya', number: 123, hex: 'abcdef' },
        { file: 'file2.csv', text: 'Hello', number: '', hex: '123456' },
        { file: 'file3.csv', text: 'Example', number: 789, hex: '' }
      ]
      const validLines = fileService.getValidLines(rows)

      expect(validLines).to.deep.equal([
        { text: 'RgTya', number: 123, hex: 'abcdef' }
      ])
    })
  })

  describe('downloadByNames', () => {
    it('should return an array of successful files', async () => {
      const names = ['file1.csv', 'file2.csv', 'file3.csv']
      const downloadParseFilesBatchStub = sinon.stub(
        fileService,
        'downloadParseFilesBatch'
      )
      const mockResults = [
        { status: 'fulfilled', value: { file: { file: 'name1', lines: [] } } },
        { status: 'rejected', reason: 'Error' },
        {
          status: 'fulfilled',
          value: { file: { file: 'name2', lines: [{ text: 'Text' }] } }
        }
      ]

      downloadParseFilesBatchStub.resolves(mockResults)

      const files = await fileService.downloadByNames(names)

      expect(files).to.deep.equal([
        { file: 'name2', lines: [{ text: 'Text' }] }
      ])
    })

    it('should handle errors and rethrow', async () => {
      const names = ['file1.csv', 'file2.csv', 'file3.csv']

      const downloadParseFilesBatchStub = sinon.stub(
        fileService,
        'downloadParseFilesBatch'
      )

      const errorMessage = 'Error fetching File1'

      downloadParseFilesBatchStub.throws(Error(errorMessage))

      try {
        await fileService.downloadByNames(names)
        expect.fail('Expected an error to be thrown')
      } catch (err) {
        expect(err.message).to.equal(errorMessage)
      }
    })
  })
})
