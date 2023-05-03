<template>
  <footer>
    <div class="container py-5">
      <div class="row" style="background-color: ">
        <div class="m-auto w-50">
          <h4 class="text-center">Đăng ký thành viên ngay hôm nay</h4>
          <p class="text-center">
            Đăng ký thành viên ngay hôm nay để nhận email về sản phẩm mới và
            chương trình khuyến mãi của Paddy
          </p>
          <div class="d-flex flex-row">
            <input class="pl-4"
              style="height: 50px"
              type="email"
              placeholder="Email của bạn"
            />
            <button>Đăng ký</button>
          </div>
        </div>
      </div>
    </div>
    <div style="background-color: #084d7b; padding: 50px 0px;" >
      <div class="container">
        <div class="row">
          <div class="col-sm-4 col-lg-2">
            <img
              src="https://www.purina.com/sites/default/files/new-logo1.png"
              alt="logo"
              class="footer__img w-75 d-block"
            />
          </div>
          <div class="col-sm-4 col-lg-2">
            <ul>
              <li>
                <router-link to="/"> Pets </router-link>
              </li>
              <li>
                <router-link to="/"> Dành cho chó </router-link>
              </li>
              <li>
                <router-link to="/"> Dành cho mèo </router-link>
              </li>
              <li>
                <router-link to="/"> Thương hiệu </router-link>
              </li>
              <li>
                <router-link to="/"> Blog </router-link>
              </li>
              <li>
                <router-link to="/"> Bộ sưu tập </router-link>
              </li>
            </ul>
          </div>
          <div class="col-sm-4 col-lg-2">
            <ul>
              <li>
                <router-link to="/"> VETERINARY CLINIC </router-link>
              </li>
              <li>
                <router-link to="/"> Giới thiệu</router-link>
              </li>
              <li>
                <router-link to="/"> Thành viên</router-link>
              </li>
              <li>
                <router-link to="/"> Điều khoản sử dụng</router-link>
              </li>
              <li>
                <router-link to="/"> Tuyển dụng</router-link>
              </li>
            </ul>
          </div>
          <div class="col-sm-4 col-lg-2">
            <ul>
              <li>
                <router-link to="/"> Hỗ trợ khách hàng </router-link>
              </li>
              <li>
                <router-link to="/">Chính sách đổi trả </router-link>
              </li>
              <li>
                <router-link to="/">Phương thức vận chuyển</router-link>
              </li>
              <li>
                <router-link to="/"> Chính sách bảo mật</router-link>
              </li>
              <li>
                <router-link to="/"> Phương thức thanh toán </router-link>
              </li>
              <li>
                <router-link to="/">Chính sách hoàn tiền </router-link>
              </li>
            </ul>
          </div>
          <div class="col-sm-4 col-lg-2">
            <ul>
              <li>
                <router-link to="/"> Thương hiệu </router-link>
              </li>
              <li>
                <router-link to="/"> Dành cho chó </router-link>
              </li>
              <li>
                <router-link to="/"> Dành cho mèo </router-link>
              </li>
            </ul>
          </div>
          <div class="col-sm-4 col-lg-2">
            <ul>
              <li>
                <router-link to="/">Liên hệ</router-link>
              </li>
              <li>
                <font-awesome-icon
                  class="me-2"
                  icon="fa-brands fa-facebook"
                  size="2x"
                  color="rgb(211, 211, 211)"
                />
                <font-awesome-icon
                  class="me-2"
                  icon="fa-brands fa-instagram"
                  size="2x"
                  color="rgb(211, 211, 211)"
                />
                <font-awesome-icon
                  class="me-2"
                  icon="fa-brands fa-twitter"
                  size="2x"
                  color="rgb(211, 211, 211)"
                />
                <font-awesome-icon
                  icon="fa-brands fa-youtube"
                  size="2x"
                  color="rgb(211, 211, 211)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
library.add(faFacebook, faInstagram, faTwitter, faYoutube);
</script>
<style scoped>

.footer__img {
  margin-top: 100px;
}
footer ul {
  list-style-type: none;
  margin-top: 30px;
}
footer ul li {
  margin-top: 10px;
  margin-bottom: 10px;
}
footer ul li:first-child a {
  font-weight: bold;
  text-transform: uppercase;
}
footer ul li a {
  font-size: 15px;
  color: rgb(211, 211, 211);
  text-decoration: none;
  font-weight: 400;
}

footer ul li a:hover {
  text-decoration: underline;
}
footer input {
  outline: none;
  width: 70%;
}
footer button {
  width: 30%;
  border: none;
  outline: none;
  padding: 0px 30px;
  background-color: rgb(154, 154, 154);
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  font-weight: bold;
  color: white
}
footer button:hover{
  opacity: 0.9;
}
</style>
