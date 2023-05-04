<script>
import PublicFooters from "@/components/Footer/PublicFooter.vue";
import HeaderPublic from "@/components/Header/PublicHeader.vue"
export default {
  components: {
    PublicFooters,
    HeaderPublic
  },
};
</script>
<template>
    <HeaderPublic/>
<main >

    <div class="banner">
        <div class="banner__information ">
            <h4 class="pt-5 fw-bold" style="font-size: 60px;">Bài viết về Chó & Mèo
</h4>
            <h5 class="mb-4">
                
Cho dù bạn nuôi chó, mèo hay cả hai, các chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn
                thông tin và lời khuyên bạn cần. Chúng tôi sử dụng các chuyên gia Purina của chúng tôi để bao gồm các chủ đề
                như sức khỏe, dinh dưỡng, hành vi, huấn luyện của chó và mèo
            </h5>
            <button class="border bg-danger text-white  fw-600 rounded-2  w-75 py-2 px-5 text-center mt-2" style="font-size: 17px;">Đọc lời khuyên</button>
        </div>
    </div>

   
    <div >
        <div class="mt-5">
            <div class="row">
                <div class="col-4 about-detail pt-4 pl-2">
                    <ul>
                        <li class="btn btn-light text-danger button-style fs-5 fw-bold">
                            Về chúng tôi
                        </li>
                        <li class="detail">Sự khác biệt</li>
                        <li class="detail">Đội ngũ</li>
                        <li class="detail">Các chương trình</li>
                    </ul>
                </div>
                <div class="col-4">
                    <h2 class="aboutus text-center pt-4 pb-2">VỀ CHÚNG TÔI</h2>
                    <p class="text-center fw-bold mt-2" style="font-size: 22px; font-weight: bold">
                        BÁC SĨ ĐỘNG VẬT QUỐC TẾ
                    </p>
                    <div class="px-2">
                        <p class="text-dark aboutus-detail">
                            Nằm ở cả trung tâm của Thành phố Hồ Chí Minh và Viêng Chăn,
                            VETERINARY CLINIC cố gắng cung cấp các loại thuốc thú y và phẫu
                            thuật từ bi, có năng lực và chuyên nghiệp cao nhất cho tất cả thú
                            cưng ở Việt Nam và Lào.
                        </p>
                        <p class="text-dark aboutus-detail">
                            Từ việc đảm bảo tính nhất quán trong các tiêu chuẩn quốc tế, tìm
                            nguồn cung ứng các đơn thuốc của bác sĩ chuyên khoa từ khắp nơi
                            trên thế giới và đi khắp đất nước, Nhóm của chúng tôi làm việc
                            không mệt mỏi để hỗ trợ khách hàng của mình bằng mọi cách có thể.
                        </p>
                        <p class="text-dark aboutus-detail">
                            Chúng tôi tự hào có cơ hội làm việc cùng với những khách hàng
                            tuyệt vời của chúng tôi (và chủ sở hữu của họ!) để tiếp tục hỗ trợ
                            cuộc sống lâu dài, năng động và khỏe mạnh!
                        </p>
                    </div>
                </div>
                <div class="col-4 m-0">
                    <img src="../../assets/images/dog-showing.jpg" class="w-100 d-block" alt="Cho" />
                </div>
            </div>
        </div>

    </div>

    <hr />

    <!-- ss -->
    <div class="col">
        <div class="ss1">
            <div class="my-5">
                <h3 class=" relate text-center w-25 text-dark py-2 fw-bold mx-auto">
                    LIÊN QUAN
                </h3>
            </div>

            <div class="d-flex justify-content-around px-5 pb-5">
                <div class="col-4">
                    <div class="card m-auto border" style="width: 19rem">
                        <!-- <img src="../../assets/images/dog-fever.jpg" width="100%" class="img-fluid w-100 d-block align-item-center" alt="" /> -->
                        <img src="../../assets/images/card-2.jpg" width="100%" class="img-fluid w-100 d-block align-item-center" alt="" />
                        <div class="card-body bg-white" style="height: 200px">
                            <div class="card-text">
                                <router-link :to="{ name: 'FeverInDog' }" class="sick-title">
                                    BỆNH SỐT Ở CHÓ ?
                                </router-link>
                                <p class="sick-content">
                                    Sốt ở chó là tình trạng mà rất nhiều người gặp khi nuôi chó.
                                    Có rất nhiều nguyên nhân [...]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4" style="height: 200px">
                    <div class="card m-auto" style="width: 19rem">
                        <img src="../../assets/images/card-1.jpg" width="100%" class="img-fluid w-100 d-block align-item-center" alt="" />
                        <div class="card-body bg-white" style="height: 200px">
                            <div class="card-text">
                                <router-link :to="{ name: 'StressCat' }" class="sick-title">GIẢM CĂNG THẲNG CHO MÈO ?</router-link>
                                <p class="sick-content">
                                    Một số lời khuyên hữu ích giúp làm giảm căng thẳng khi đến
                                    [...]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-4" style="height: 200px">
                    <div class="card m-auto" style="width: 19rem">
                        <img src="../../assets/images/card-3.jpg" width="100%" class="img-fluid w-100 d-block align-item-center" alt="" />
                        <div class="card-body bg-white" style="height: 200px">
                            <div class="card-text">
                                <router-link :to="{ name: 'StressCat' }" class="sick-title">GIẢM CĂNG THẲNG CHO MÈO ?</router-link>
                                <p class="sick-content">
                                    Một số lời khuyên hữu ích giúp làm giảm căng thẳng khi đến
                                    [...]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    </div>
    <hr />
    
</main>
<PublicFooters/>

</template>

<style>
@import "./About.module.css";
</style>
