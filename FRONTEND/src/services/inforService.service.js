import createApiClient from "./api.service";
class InforService {
  constructor(baseUrl = "/api/infoService") {
    this.api = createApiClient(baseUrl);
  }
  

  async getAll() {
    return (await this.api.get("/")).data;
  }
  

}
export default new InforService();
