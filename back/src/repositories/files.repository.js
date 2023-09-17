import axios from 'axios'

class FilesRepository {
  constructor () {
    this.axiosClient = axios.create({
      baseURL: 'https://echo-serv.tbxnet.com/v1/',
      headers: {
        authorization: 'Bearer aSuperSecretKey'
      }
    })
  }

  async fetchFileNames () {
    const response = await this.axiosClient.get('/secret/files')
    return response.data
  }

  async fetchFileByName (name) {
    const response = await this.axiosClient.get(`/secret/file/${name}`)
    return response.data
  }
}

export default new FilesRepository()
