

<script>
    import {
        library
    } from "@fortawesome/fontawesome-svg-core";
    import {
        FontAwesomeIcon
    } from "@fortawesome/vue-fontawesome";
    import {
        faMoneyBill,
        faCreditCard,
        faPrint,
        faUser,
    } from "@fortawesome/free-solid-svg-icons";
    library.add(faMoneyBill, faCreditCard, faPrint, faUser);
    import registrationInformationService from "../../services/registrationInformation.service";

    export default {
        data() {
            return {
                listRegistrationInformation: [],
                filtered: [],
            }
        },
        methods: {
            async retrieveRequire() {
                try {
                    this.listRegistrationInformation = await registrationInformationService.getAll();
                    this.listRegistrationInformation = this.listRegistrationInformation.filter((e) => e.TenLoaiDichVu == "Khám bệnh")

                } catch (error) {
                    console.log(error);
                }
            },
            filteredService(filter) {
                this.filtered = this.listRegistrationInformation.filter(e => e.TenLoaiDichVu == filter)
            },
        },
        created() {
            this.retrieveRequire();
        }
    }
</script>

<template>
    <main>
        <div>
            <div class="row">
                <div class="pt-5">
                    <button class="bg bg-primary px-3 py-1 " style="text-decoration: none; border: 1px solid  white ; border-radius: 10px;">
                        <router-link :to="{ name: 'ListDoctors' }" class="text-light" style="text-decoration: none;">
                            Thêm lịch</router-link>
                    </button>
                    <div class="px-4 py-2 m-auto" style="background-color: beige; ">
                        <h4 class="text-center my-4">Thông tin chi tiết đơn thuốc</h4>
                        <div class="row">
                            <div class="col">
                                Tên dịch vụ
                                <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required placeholder="Nhập vào tên dịch vụ"  />
                            </div>
                            <div class="col">
                                Vật tư y tế:
                                <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required placeholder="Nhập vào tên thuốc"  />
                            </div>
                            <div class="col">
                                Số lượng:

                                <input type="number" min="1" max="20" class="form-control w-100 my-2" id="formGroupExampleInput" required  />
                            </div>
                        </div>
                        <div class="row pt-2">
                            <div class="col">
                                Số lượng sáng:
                                <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required placeholder=""  />
                            </div>
                            <div class="col">
                                Số lượng trưa:
                                <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required placeholder=""  />
                            </div>
                            <div class="col">
                                Số lượng tối:
                                <input type="text" class="form-control w-100 my-2" id="formGroupExampleInput" required placeholder=""  />
                            </div>
                        </div>

                        <div class="pt-2">
                            Ghi chú:
                            <br>
                            <textarea class="form-control w-50 my-2
                            " id="exampleFormControlTextarea1" rows="3"></textarea>
                           

                        </div >
                        

                    </div>

                 
                </div>
            </div>

            <div class="row">
                <table class="table table-hover text-center table-bordered table table-bordered">
                    <thead>
                        <th>Tên dịch vụ</th>
                        <th>Tên Vật tư y tế</th>
                        <th> Số lượng vật tư y và thuốc</th>
                        <th>Giá vật tư y và thuốc</th>
                        <th>Sáng</th>
                        <th>Trưa</th>
                        <th>Tối</th>
                        <th>Thành tiền</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tbody>

                </table>
            </div>
        </div>
    </main>
</template>
