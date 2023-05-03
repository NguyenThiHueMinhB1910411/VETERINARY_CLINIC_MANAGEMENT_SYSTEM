import createApiClient from "./api.service";
class PetService {
    constructor(baseUrl = "/api/pet"){
        this.api = createApiClient(baseUrl);
    }

    async getAll(){
        return (await this.api.get("/")).data;
    }
}

export default new PetService();