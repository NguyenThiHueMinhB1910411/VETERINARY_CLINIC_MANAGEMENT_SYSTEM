import createApiClient from "./api.service";
class MedicalSuppliesService {
  constructor(baseUrl = "/api/medicalSupplies") {
    this.api = createApiClient(baseUrl);
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
async getAll() {
  return (await this.api.get("/")).data;
}


async get(id) {
  return (await this.api.get(`/${id}`)).data;
}
async getMedical(data){
  return (await this.api.post("/findMedical",data)).data;
}

async delete(id) {
  console.log(id)
  return (await this.api.delete(`/${id}`)).data
}

}
export default new MedicalSuppliesService();
