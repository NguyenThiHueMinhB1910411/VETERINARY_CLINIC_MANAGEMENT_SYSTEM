import createApiClient from "./api.service";
class StaffService {
  constructor(baseUrl = "/api/staff") {
    this.api = createApiClient(baseUrl);
  }
  // async create(data) {
  //   return (await this.api.post("/", data)).data;
  // }  
  // async create(data) {
  //   return (
  //     await this.api.post('/', data, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //   ).data
  // }
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
async update(id, data) {
  return (await this.api.put(`/${id}`, data)).data;
}
async delete(id) {
  console.log(id)
  return (await this.api.delete(`/${id}`)).data;
}

}
export default new StaffService();
