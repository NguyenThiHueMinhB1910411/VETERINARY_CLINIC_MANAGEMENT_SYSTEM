<script>

import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import {
    faHouse,
    faGear,
    faUser,
    faUsers,
    faDog,
    faArrowDown,
    faUserDoctor,
    faCalendarDays,
    faUserPen,
    faTrash,
    faPen,
    faPlus,
    faCircleInfo,
    faPenToSquare,
    faRotateRight,

} from "@fortawesome/free-solid-svg-icons";
library.add(
    faHouse,
    faGear,
    faUser,
    faUsers,
    faDog,
    faArrowDown,
    faUserDoctor,
    faCalendarDays,
    faUserPen,
    faTrash,
    faPen,
    faPlus,
    faCircleInfo,
    faPenToSquare,
    faRotateRight,
);


import MedicalSuppliesService from "../../services/medicalSupplies.service";

export default {
    data() {
        return {
            listMedicalSupplies: [],
            data: {},
            medicalSupplies: null,
            selectedFile: {},
        }
    },
    methods: {
        changeFile(e) {
            const file = e.target.files[0];
            this.selectedFile = file;
        },
        buildFormData(formData, data, parentKey) {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                    this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data == null ? '' : data;
                formData.append(parentKey, value);
            }
        },

        async retrieveMedical() {
            try {
                this.listMedicalSupplies = await MedicalSuppliesService.getAll();

            } catch (error) {
                console.log(error);
            }
        },
        async handleSubmit() {
            var formData = new FormData();
            formData.append('file', this.selectedFile);
            this.buildFormData(formData, this.data)

            const rs = await MedicalSuppliesService.create(formData);
            this.retrieveMedical();

        },
        async handleDelete(mavattu) {
            if (window.confirm("Bạn có muốn xóa thuốc này ?")) {
                MedicalSuppliesService.delete(mavattu)
                this.retrieveMedical();

            }
        },
    },
    // async handleSubmit() {
    //     const result = await MedicalSuppliesService.create(this.data);

    // },

    created() {

        this.retrieveMedical();
    },
}
</script>
<template>
<main>
    <div>

        <div class="row my-3">

            <div class="col-7">
                <div class="d-flex">
                    <div style="font-size: 16px" @click="medicalSupplies">
                        <button class="btn text-light px-2" style="background-color: #cc4d26">
                            <font-awesome-icon icon="fa-solid fa-rotate-right" />
                            Refresh
                        </button>

                    </div>
                    <button type="button" class="btn text-light mx-3" style="background-color: #04253b;" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                    Thêm vật tư
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Thêm vật tư y tế</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <table>
                                    <tr>
                                        <td class=" px-2"> Mã thuốc:</td>
                                        <td> <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.MaVatTu" /></td>
                                    </tr>
                                    <tr>

                                    </tr>
                                    <tr>
                                        <td class=" px-2">Tên thuốc:</td>
                                        <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.TenThuoc" />
                                    </tr>
                                    <tr>
                                        <td class=" px-2">Giá:</td>
                                        <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.Gia" />

                                    </tr>
                                    <tr>
                                        <td class=" px-2">Hình:</td>
                                        <input type="file" id="avatar" name="avatar" @change="changeFile" accept="image/png, image/jpeg">

                                    </tr>
                                    <tr>
                                        <td class=" px-2">Mô tả:</td>
                                        <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.MoTa" />

                                    </tr>
                                </table>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" @click="handleSubmit" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                </div>

                

            </div>

            <div class="row mt-4">

                <table class="table table-hover text-center table-bordered table table-bordered " style="font-size: 15px;background-color: white;padding-bottom: 80%; box-shadow: 0px 5px 3px  rgba(212, 212, 212, 0.25);">              <thead>
                    <tr style="color: #CC4D26;">
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Hình</th>
                            <th>Giá</th>
                            <h></h>
                        </tr>

                    </thead>
                    <tbody>
                        <tr v-for="(medicalSupplies, index) in this.listMedicalSupplies">
                            <td>{{ index +1 }}</td>
                            <td>{{ medicalSupplies.TenThuoc }}</td>
                            <td>
                                <img :src="'/src/assets/images/'+medicalSupplies.HinhAnh" alt="" class="img-fluid " style="width: 90px;">
                            </td>
                     
                            <td>
                                {{ new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format( medicalSupplies.Gia).replace("VND", "") }}
                            </td>
                            <td>
                                <font-awesome-icon icon="fa-solid fa-pen-to-square" class=" text-warning " />
                                <font-awesome-icon icon="fa-solid fa-trash" class=" text-danger px-4" @click="handleDelete(medicalSupplies.MaVatTu)" />

                            </td>

                        </tr>
                    </tbody>

                </table>

            </div>

        </div>

    </div>
</main>
</template>

<style scoped>
</style>
