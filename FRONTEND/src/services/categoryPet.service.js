import createApiClient from "./api.service";
class CategoryPetService {
  constructor(baseUrl = "/api/categoryPet") {
    this.api = createApiClient(baseUrl);
  }
  

  async getAll() {
    return (await this.api.get("/")).data;
  }
  

}
export default new CategoryPetService();
