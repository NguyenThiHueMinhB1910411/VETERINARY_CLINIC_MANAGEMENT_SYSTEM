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
  
  <main>
    <div>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="../../assets/images/bg-new1.jpg"
              class="d-block w-100"
              alt="Thumnail2"
            />
          </div>

          <div class="carousel-item">
            <img
              src="../../assets/images/bg-new-4.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="../../assets/images/bg-new-2.jpeg"
              class="d-block w-100"
              alt="Thumnail1"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    <div class="py-5" style="background-color: #edf1d6; height: 220px">
      <h4 class="text-center text-uppercase fw-bold">KHÁM PHÁ DỊCH VỤ CỦA CHÚNG TÔI</h4>
      <div class="d-flex justify-content-center mt-3">
        <button class="btn-service">Khám bệnh</button>
        <button class="btn-service">Làm đẹp</button>
        <button class="btn-service">Nội trú</button>
      </div>
    </div>

    <div class="row w-100 py-5">
      <div
        class="col-6 col-sm-6 col-md-6 d-flex flex-column align-self-center"
        style="padding-left: 100px"
      >
        <p class="fs-4 fw-bold">Tìm thức ăn tốt nhất cho chó hoặc mèo của bạn</p>
        <p class="fs-5 fw-bold">
          Nhận đề xuất thức ăn cho thú cưng được cá nhân hóa của bạn bằng công cụ Tìm thức ăn cho thú cưng.
        </p>
        <div class="d-flex flex-row">
          <router-link to="/" class="btn-banner">
            Tìm thức ăn cho thú cưng của bạn
          </router-link>
          <router-link to="/" class="btn-banner"> Xem thêm</router-link>
        </div>
      </div>
      <div class="col-6 col-sm-6 col-md-6">
        <img
          class="w-100 d-block"
          src="https://www.purina.com/sites/default/files/styles/kraken_generic_max_width_600/public/2022-04/PFF_PurinaHomepage_Module_ExpertSeal_2.png?itok=fh9z0hwv"
          alt="Banner"
        />
      </div>
    </div>

    <div style="background-color: #f4f4f4" class="py-5">
      <div class="container">
        <h4 class="text-center">Điều gì hướng dẫn chúng tôi
</h4>
        <p class="text-center">
          Chúng tôi định hình tương lai về Sức khỏe và Hạnh phúc cho vật nuôi và con người thông qua ba mục tiêu đơn giản.
        </p>
        <div class="row mt-4">
          <div class="col-lg-4 col-md-4 col-sm-4 align-item-center">
            <div class="d-flex justify-content-center">
              <img
                class="rounded-circle"
                src="../../assets/images/guide-1.png"
                style="width: 90%"
                alt=""
              />
            </div>
            <p
              class="text-center d-flex justify-content-center align-items-center service-title mt-4 fw-bold"
            >
            Thú cưng là đam mê của chúng tôi
            </p>
            <p class="text-center">
              Chúng tôi đang kết nối vật nuôi và con người. Chúng tôi đang xây dựng mạnh mẽ các cộng đồng. Chúng ta đang định hình một thế giới tốt đẹp hơn.
            </p>
            <p class="text-center">
              <router-link to="/" class="text-uppercase text-danger"
                >Biết thêm</router-link
              >
            </p>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 align-item-center">
            <div class="d-flex justify-content-center">
              <img
                class="rounded-circle"
                src="../../assets/images/guide-2.png"
                style="width: 90%"
                alt=""
              />
            </div>
            <p
              class="text-center d-flex justify-content-center align-items-center service-title mt-4 fw-bold"
            >
            An toàn là lời hứa của chúng tôi
            </p>
            <p class="text-center">
              Chúng tôi đang vượt quá tiêu chuẩn an toàn. Chúng tôi cam kết về chất lượng. Chúng tôi đang dẫn đầu ngành.
            </p>
            <p class="text-center">
              <router-link to="/" class="text-uppercase text-danger"
                >Biết thêm...</router-link
              >
            </p>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 align-item-center">
            <div class="d-flex justify-content-center">
              <img
                class="rounded-circle"
                src="../../assets/images/guide-3.png"
                style="width: 90%"
                alt="123456"
              />
            </div>
            <p
              class="text-center d-flex justify-content-center align-items-center service-title mt-4 fw-bold"
            >
            Đổi mới là cam kết của chúng tôi
            </p>
            <p class="text-center">
              Chúng tôi đang khám phá những khả năng mới. Chúng tôi đang làm dinh dưỡng Chúng tôi
              đang thúc đẩy cuộc sống của vật nuôi.
            </p>
            <p class="text-center">
              <router-link to="/" class="text-uppercase text-danger"
                >Xem mục tiêu</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
  <PublicFooters/>
</template>

<style scoped>
.btn-service {
  background-color: black;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 20px;
  cursor: pointer;
}

.btn-service:hover {
  background-color: white;
  border: 1px solid;
  color: black;
}

.btn-banner {
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
  background-color: #cf0a0a;
  color: white;
  padding: 10px 20px;
  margin-right: 20px;
  border: 1px solid #cf0a0a;
  text-align: center;
}

.btn-banner:hover {
  border: 1px solid #cf0a0a;
  color: #cf0a0a;
  background-color: white;
}
</style>
