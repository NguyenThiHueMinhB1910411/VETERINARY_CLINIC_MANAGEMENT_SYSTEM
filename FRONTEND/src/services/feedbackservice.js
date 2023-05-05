import createApiClient from "./api.service";
class FeedbackService {
  constructor(baseUrl = "/api/feedback") {
    this.api = createApiClient(baseUrl);
  }
  

  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post('/', data)).data;
  }
  async update(data) {
    return (await this.api.put(`/${data._id}`, data)).data
  }
  

}
export default new FeedbackService();
