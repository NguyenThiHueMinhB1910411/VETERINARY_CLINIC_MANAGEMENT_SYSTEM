const { ObjectId } = require("mongodb");

class CustomerService {
  extractCustomerData(payload) {
    const customer = {
      TenKhachHang: payload.TenKhachHang,
      SodienThoai: payload.SodienThoai,
      DiaChi: payload.DiaChi,
      Gmail: payload.Email,
      
    };
    Object.keys(customer).forEach(
      (key) => customer[key] === undefined && delete customer[key]
    );
    return customer;
  }
  constructor(client) {
    this.customer = client.db().collection("customer");
  }
  async getAllCustomer() {
    const curson = await this.customer.find();
    return await curson.toArray();
  }
}
module.exports = CustomerService;
