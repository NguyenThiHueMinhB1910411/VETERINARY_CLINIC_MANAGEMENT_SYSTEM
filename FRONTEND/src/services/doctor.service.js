import createApiClient from './api.service'
class DoctorService {
  constructor(baseUrl = '/api/doctor') {
    this.api = createApiClient(baseUrl)
  }

  async create(data) {
    return (
      await this.api.post('/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ).data
  }

  
  async update(id, data) {
    console.log(id, data)
    return (await this.api.post(`/${id}`, data)).data
  }


  async getAll() {
    return (await this.api.get('/')).data
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data
  }

  async delete(id) {
    console.log(id)
    return (await this.api.delete(`/${id}`)).data
  }


 
}
export default new DoctorService()
