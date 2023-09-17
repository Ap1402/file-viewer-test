/* eslint-env mocha */
import { expect } from 'chai'
import sinon from 'sinon'
import FilesRepository from '../src/repositories/files.repository.js'

describe('FilesRepository', () => {
  let axiosGetStub

  beforeEach(() => {
    axiosGetStub = sinon.stub(FilesRepository.axiosClient, 'get')
  })

  afterEach(() => {
    axiosGetStub.restore()
  })

  describe('fetchFileNames', () => {
    it('should return file names', async () => {
      const data = ['file1.csv', 'file2.csv']
      axiosGetStub.returns({ data })
      const fileNames = await FilesRepository.fetchFileNames()

      expect(fileNames).to.deep.equal(['file1.csv', 'file2.csv'])
    })
  })

  describe('fetchFileByName', () => {
    it('should return file data by name', async () => {
      const data = ['file1.csv', 'file2.csv']
      axiosGetStub.returns({ data })
      const fileData = await FilesRepository.fetchFileByName('file1.csv')
      expect(fileData).to.equal(data)
    })

    it('should call the endpoint with the correct fileName', async () => {
      const fileName = 'file1.csv'
      const data = ['file1.csv', 'file2.csv']
      axiosGetStub.returns({ data })
      await FilesRepository.fetchFileByName(fileName)
      expect(axiosGetStub.calledWith('/secret/file/' + fileName)).to.equal(true)
    })
  })
})
