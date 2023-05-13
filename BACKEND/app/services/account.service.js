const { ObjectId } = require("mongodb");
const bscrypt = require("bcrypt");

class AccountService {
  extractAccountData(payload) {
    const account = {
      TenAccount: payload.TenAccount,
      Password: payload.Password,
      Gmail: payload.Gmail,
      SoDienThoai: payload.SoDienThoai,
    };
    Object.keys(account).forEach(
      (key) => account[key] === undefined && delete account[key]
    );
    return account;
  }
  constructor(client) {
    this.Account = client.db().collection("account");
  }
  async login(payload) {
    console.log(payload);
    const account = this.extractAccountData(payload);
    console.log(account);
    const result = await this.Account.findOne({
      TenAccount: account.TenAccount,
     
    });
    if(result){
      const validPasswd = await bscrypt.compare(account.Password, result.Password) ;
      if(validPasswd){
        return result;
      }else{
        return false;
      }
    }
    return false;
    // console.log(result);
    // return result;
  }

  // async register(payload) {
  //   console.log(payload);
  //   const data = this.extractAccountData(payload);
  //   console.log(data);
  //   const result = await this.Account.insertOne(data);
  //   return result.value;
  // }

  async register(payload) {
    console.log(payload);
    const pass = await bscrypt.genSalt(7);
    const Password = await bscrypt.hash(`${payload.Password}`, pass);
    const data = this.extractAccountData({...payload,Password:Password});
    console.log(Password);
    const result = await this.Account.insertOne(data);
    return result.value;
  }

  async create(payload) {
    console.log(payload);
    const pass = await bscrypt.genSalt(7);
    const Password = await bscrypt.hash(`${payload.Password}`, pass);
    const data = this.extractAccountData({...payload,Password:Password});
    console.log(Password);
    const result = await this.Account.insertOne(data);
    return result.value;
  }

  async find(filter) {
    const curson = await this.Account.find(filter);
    return await curson.toArray();
  }


  // async delete(id) {
  //   const result = await this.Account.findOneAndDelete({
  //     _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
  //   });
  //   return result.value;
  // }
  async getAllAccount() {
    const curson = await this.Account.find();
    return await curson.toArray();
  }
  
  // async delete(id) {
  //   console.log(id);
  //   const result = await this.Account.findOneAndDelete({
  //     TenAccount :id
  //   })
  //   return result;
  // }

  async deleteAll() {
    const result = await this.Account.deleteMany({});
    return result.deletedCount;
  }
  async findById(id) {
    return await this.Account.findOne({
      // MaBacSi: id,
    });
  }
  async delete(id) {
    console.log(id);
    const result = await this.Account.findOneAndDelete({
      TenAccount :id
    })
    return result;
  }

  async update(id, payload) {
    const update = this.extractAccountData(payload);
    const result = await this.Account.findOneAndUpdate(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
}


module.exports = AccountService;
