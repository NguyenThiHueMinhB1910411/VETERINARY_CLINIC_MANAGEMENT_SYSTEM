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
<main class="container-fluid">
    <!--  ABOUT US -->
    <div class="container">
        <div class="row py-5">
            <div class="col-6 title">LIÊN HỆ</div>
            <div class="col-6">
                <img src="../../assets/images/cat-about.webp " class="img-fluid w-100" alt="" />
            </div>
        </div>
    </div>
    <div></div>
    <hr />

    <div class="p-2">
        <div class="row p-4">
            <div class="col-6 contact-content ">
                <h5 class="py-2 text-light">LIÊN HỆ CHÚNG TÔI</h5>
                <div class="text-light">
                    Chúng tôi tự hào có cơ hội làm việc cùng với những khách hàng tuyệt
                    vời của chúng tôi (và chủ sở hữu của họ!) để tiếp tục hỗ trợ cuộc
                    sống lâu dài, năng động và khỏe mạnh!
                </div>
            </div>
            <!-- form contact -->
            <div class="col-6 px-3">
                <div class="">
                    <form class=" p-5 border border-dark frame-contact">
                        <div class="mb-3">
                            <input type="email" class="form-control  bg-light" id="exampleInputEmail1" aria-describedby="" placeholder="TÊN*" />
                        </div>
                        <div class="mb-3">
                            <input type="email" class="form-control  bg-light" id="exampleInputEmail1" aria-describedby="" placeholder="EMAIL*" />
                        </div>
                        <div class="mb-3">
                            <input type="tel" id="phone" name="phone" placeholder="SỐ ĐIỆN THOẠI*" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>
                            <!-- <input type="phone" class="form-controlbg-light" id="exampleInputEmail1" aria-describedby="" placeholder="PHONE*" /> -->
                        </div>

                        <div class="mb-3">
                            <textarea rows="4" cols="50" name="comment" form="usrform" placeholder="LỜI NHẮN...">
</textarea>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" class="btn text-light button-submit  px-4">Submit</button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div class="py-4 px-5">
        <h4 class=" text-center pb-5" style="font-size: 2rem; ">Chăm sóc sức khỏe thú cưng được cá nhân hóa</h4>
        <div class="row">
            <div class="col-3 px-5 text-center">
                <div>
                    <img src="../../assets/images/health-icon-1.png" alt="" class="img-fluid">
                </div>
                <h4 class="py-2">Không giới hạn kiểm tra</h4>
                <p>
                    Ghé thăm chúng tôi để kiểm tra nhiều lần nếu bạn cần để giữ cho thú cưng của bạn vui vẻ và khỏe mạnh.
                </p>
            </div>
            <div class="col-3 px-5 text-center">
                <div>
                    <img src="../../assets/images/health-icon-2.png" alt="" class="img-fluid">
                </div>
                <h4>Gợi ý Vaccine</h4>
                <p>Ngăn ngừa các bệnh truyền nhiễm và có khả năng gây chết người bằng các loại vắc-xin thiết yếu mà thú cưng của bạn cần để phát triển..</p>
            </div>
            <div class="col-3 px-5 text-center">
                <div>
                    <img src="../../assets/images/health-icon-3.png" alt="" class="img-fluid">
                </div>
                <h4>Thành viên hàng năm</h4>
                <p>Hãy yên tâm khi biết rằng bạn có cơ hội tốt nhất để tìm thấy thú cưng của mình nếu chúng bị lạc.</p>
            </div>
            <div class="col-3 px-5 text-center">
                <div>
                    <img src="../../assets/images/health-icon-4.png" alt="" class="img-fluid">
                </div>
                <h4>Phát hiện bệnh sớm và xét nghiệm chẩn đoán</h4>
                <p>Phát hiện các vấn đề như bệnh tiểu đường hoặc giun đường ruột sớm hơn bằng xét nghiệm định kỳ phù hợp với độ tuổi của thú cưng.</p>
            </div>
        </div>
    </div>

    <!-- <div class="py-2">
        <h3 class="text-center"><b>Chi nhánh</b></h3>
        <div class="row ml-4 mr-4 pb-4">
            <div class="col-4 text-right branch-position">Cần Thơ</div>
            <div class="col-4 text-center branch-position">Hồ Chí Minh</div>
            <div class="col-4 text-left branch-position">Vĩnh Long</div>
        </div>
        <hr />
    </div> -->
</main>
<PublicFooters/>

</template>

<style>
@import'./Contact.module.css';
</style>