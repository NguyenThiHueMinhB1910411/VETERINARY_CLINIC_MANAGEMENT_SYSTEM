<script>
import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import {
    Bar
} from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
import {
    faHouse,
    faGear,
    faUser,
    faUsers,
    faDog,
    faArrowDown,
    faUserDoctor,
    faCalendarDays,
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
);
export default {
    name: 'BarChart',
    components: {
        Bar
    },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March'],
                datasets: [{
                    data: [40, 20, 12],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                    ],
                    borderWidth: 1
                }]
                
            },
            chartOptions: {
                responsive: true
            }
        }
    }
}
</script>
<template>
<main>
    <div>
        <div class=" border my-3 py-3 text-center fw-bold fs-5 ">
            TỔNG QUAN
        </div>
        <div class="px-3">
            <div class=" row tong-hop mt-4 p-0">
                <div class="col-4">
                    <div class="card bg-white shadow-sm mx-auto">
                        <div class="row">

                            <div class="col-9 fw-bold">
                                <p class="mt-3 ms-4">Bác sĩ</p>
                                <p class="ms-5 fs-3">100</p>
                            </div>
                            <div class="col-3 d-flex justify-content-center">
                                <!-- <img src="https://cdn-icons-png.flaticon.com/512/4807/4807695.png"  alt="" style="width: 40%!importain;" > -->

                                <font-awesome-icon icon="a-solid fa-user-doctor" class="text-center pt-5 mx-2  " style="font-size: 30px;" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-4">
                    <div class="card bg-white shadow-sm mx-auto">
                        <div class="row">

                            <div class="col-9 fw-bold">
                                <p class="mt-3 ms-4">Khách hàng</p>
                                <p class="ms-5 fs-3">100</p>
                            </div>
                            <div class="col-3 d-flex justify-content-center">

                                <font-awesome-icon icon="fa-solid fa-users" class="text-center pt-5 mx-2  " style="font-size: 30px;" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card bg-white shadow-sm mx-auto">
                        <div class="row">

                            <div class="col-9 fw-bold">
                                <p class="mt-3 ms-4">Sự kiện mới</p>
                                <p class="ms-5 fs-3">100</p>
                            </div>
                            <div class="col-3 d-flex justify-content-center">

                                <font-awesome-icon icon="fa-solid fa-calendar-days" class="text-center pt-5 mx-2  " style="font-size: 30px;" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div>

        </div>

    </div>
    <div>
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</main>
</template>

<style scoped>
</style>
