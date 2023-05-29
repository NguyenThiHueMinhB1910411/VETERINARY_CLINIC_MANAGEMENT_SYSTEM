import createApiClient from './api.service'
class RegistrationInformationService {
  constructor(baseUrl = '/api/registrationInformation') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    return (await this.api.get('/')).data
  }

  async getById(id) {
    return (await this.api.get(`/${id}`)).data
  }
 

  async create(data) {
    return (await this.api.post('/', data)).data
  }

  async update(data) {
    return (await this.api.put(`/${data._id}`, data)).data
  }


}

export default new RegistrationInformationService()
