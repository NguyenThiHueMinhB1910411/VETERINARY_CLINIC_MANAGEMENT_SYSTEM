import createApiClient from "./api.service";
class AccountService {
    constructor(baseUrl = "/api/customer") {
        this.api = createApiClient(baseUrl);
    } 
    async getAll() {
        return (await this.api.get("/")).data;
    } 

} 
export default new AccountService();