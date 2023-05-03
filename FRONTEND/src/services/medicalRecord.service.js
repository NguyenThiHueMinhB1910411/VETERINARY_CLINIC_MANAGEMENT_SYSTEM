import createApiClient from './api.service'
class MedicalRecordService {
  constructor(baseUrl = '/api/medicalRecord') {
    this.api = createApiClient(baseUrl)
  }

  async create(data) {
    return (await this.api.post('/', data)).data
  }
  async update(id,data) {
    console.log(id,data)
    return (await this.api.post(`/${id}`,data)).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async getAll() {
    return (await this.api.get("/")).data;
} 
  async getAllInfo() {
    return (await this.api.get(`/getAll/info`)).data;
} 
}
export default new MedicalRecordService()
