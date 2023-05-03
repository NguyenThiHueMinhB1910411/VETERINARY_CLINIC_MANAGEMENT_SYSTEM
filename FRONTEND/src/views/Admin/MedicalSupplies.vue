<script>
// import {
//     userAccStore
// } from "@/Store/userStore";
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
);

// import medicalSupplies from "../../services/medicalSupplies.service";
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
        
        // async getMedicalSupplies(id) {
        //     try {
        //         this.medicalSupplies = await MedicalSuppliesService.get(id);

        //     } catch (error) {
        //         console.log(error);
        //     }
        // },

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
        <div class="row">

            <div class="">
                <div class="">

                    <div class="">

                        <div class="text-center">
                            <h5 class=" text-dark text-center pt-4">DANH SÁCH VẬT TƯ Y TẾ
                            </h5>
                        </div>

                        <div class="">

                            <button type="button" class="btn text-light mx-3" style="background-color: #04253b;" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                                Thêm vật tư
                            </button>
                            <!-- Button trigger modal -->

                            <!-- Modal -->
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
                                                    <td class=" px-2"> Mã vật tư:</td>
                                                    <td> <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.MaVatTu" /></td>
                                                </tr>
                                                <tr>

                                                </tr>
                                                <tr>
                                                    <td class=" px-2">Tên vật tư:</td>
                                                    <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.TenThuoc" />
                                                </tr>
                                                <tr>
                                                    <td class=" px-2">Giá:</td>
                                                    <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.Gia" />

                                                </tr>
                                                <tr>
                                                    <td class=" px-2">Hình:</td>
                                                    <!-- <input class="col form-control" type="file"  /> -->
                                                    <input type="file" id="avatar" name="avatar" @change="changeFile" accept="image/png, image/jpeg">

                                                </tr>
                                                <tr>
                                                    <td class=" px-2">Mô tả:</td>
                                                    <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.MoTa" />

                                                </tr>
                                            </table>
                                           
                                        </div>
                                        <!-- <div class="modal-body">
                                            <div class="row">
                                                Mã vật tư:
                                                <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.MaVatTu" />
                                            </div>
                                            <div class="row">
                                                Tên vật tư:
                                                <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.TenVatTu" />
                                            </div>
                                            <div class="row">
                                                Giá:
                                                <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.Gia" />
                                            </div>
                                            <div class="row">
                                                Hình:
                                                <input class="col form-control" type="file" placeholder="Nhập vào mã vật tư" />
                                            </div>
                                            <div class="row">
                                                Mô tả:
                                                <input class="col form-control" type="text" placeholder="Nhập vào mã vật tư" v-model="this.data.MaVatTu" />
                                            </div>
                                        </div> -->
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary"  @click="handleSubmit"  data-bs-dismiss="modal">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row  mt-4">

                            <table class="table table-hover text-center table-bordered table table-bordered " style="font-size: 15px;background-color: white;padding-bottom: 80%; box-shadow: 0px 5px 15px rgba(0,0,0,0.25);">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Hình</th>
                                        <th>Giá</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    <tr v-for="(medicalSupplies, index) in this.listMedicalSupplies">
                                        <td>{{ index +1 }}</td>
                                        <td>{{ medicalSupplies.TenThuoc }}</td>
                                        <td>
                                            <img :src="'/src/assets/images/'+medicalSupplies.HinhAnh" alt="" class="img-fluid " style="width: 100px;">
                                             <!-- <img :src="medicalSupplies.HinhAnh" class="w-25" alt=""> -->
                                            </td>
                                        <td>{{ medicalSupplies.Gia }}</td>

                                    </tr>
                                </tbody>

                            </table>

                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
</main>
</template>

<style scoped>
</style>
