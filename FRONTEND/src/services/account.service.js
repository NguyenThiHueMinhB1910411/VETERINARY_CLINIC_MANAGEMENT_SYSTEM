import createApiClient from "./api.service";
class AccountService {
    constructor(baseUrl = "/api/account") {
        this.api = createApiClient(baseUrl);
    } 
    async create(data) {
        return (await this.api.post("/create", data)).data;
      } 
      async get(id) {
        return (await this.api.get(`/${id}`)).data;
      }
    async getAll() {
        return (await this.api.get("/")).data;
    } 
    async login(data) {
        return (await this.api.post("/", data)).data;
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
      }

      async delete(id) {
        // console.log(id)
        return (await this.api.delete(`/${id}`)).data;
      }

} 
export default new AccountService();