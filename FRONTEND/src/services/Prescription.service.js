import createApiClient from './api.service'
class PrescriptionService {
  constructor(baseUrl = '/api/prescription') {
    this.api = createApiClient(baseUrl)
  }

  async create(data) {
    return (await this.api.post('/', data)).data
  }
  //4/8/2023
  async update(id,data) {
    console.log(id,data)
    return (await this.api.post(`/${id}`,data)).data;
  }
 
  async getAll() {
    return (await this.api.get('/')).data
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data
  }
}
export default new PrescriptionService()
