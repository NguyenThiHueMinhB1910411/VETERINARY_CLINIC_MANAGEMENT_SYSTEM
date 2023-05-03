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
  <main class="">
    <div>
        <p>
      <img
        class="col-5 d-flex justify-content-center offset-4"
        src="../assets/images/Banner_catdog.jpg"
        width=""
        alt=""
      />
    </p>
    <div class="container bg-booking col-9 py-6 px-4 rounded">
      <h3
        class="text-center"
        style="font-weight: 650; font-family: Arial, Helvetica, sans-serif"
      >
        Chọn dịch vụ cần đăng ký
      </h3>
      <hr />
      <div class="row m-0">
        <div class="col py-5 text-center mx-4 rounded text-name">
          Khám sức khỏe
        </div>
        <div class="col py-5 text-center mx-4 rounded text-name">
          <!-- Làm đẹp -->

          <!-- Modal register -->
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary text-light"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Đăng ký!
          </button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Đăng ký dịch vụ
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="formGroupExampleInput">Tên vật nuôi</label>
                      <input
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput"
                        placeholder="Nhập vào tên vật nuôi"
                      />
                    </div>
                    <div class="form-group">
                      <label for="formGroupExampleInput2">Giới tính</label>
                      <div class="row pl-2">
                        <div class="form-check ml-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            class="form-check-label col"
                            for="flexRadioDefault1"
                          >
                            male
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label col"
                            for="flexRadioDefault2"
                          >
                            female
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="formGroupExampleInput2"
                        >Dịch vụ đã chọn:</label
                      >
                      <div class="row pl-2">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label col"
                            for="flexRadioDefault2"
                          >
                            Spa- grooming
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="formGroupExampleInput2">Gói dịch vụ:</label>
                      <div class="row pl-2">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label col"
                            for="flexRadioDefault2"
                          >
                            1
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label col"
                            for="flexRadioDefault2"
                          >
                            2
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label col"
                            for="flexRadioDefault2"
                          >
                            3
                          </label>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <!-- chọn ngày -->
                    <div class="form-group">
                      <!--  -->
                      <div class="">
                        <div class="title">Thời gian đặt hẹn</div>
                        <div
                          class="box-timeslot"
                          style="margin-top: 20px; margin-bottom: 15px"
                        >
                          <div class="row">
                            <div class="select-day col">
                              <select name="day" id="day">
                                <option value="">Chọn ngày</option>

                                <option value="01">01</option>

                                <option value="02">02</option>

                                <option value="03">03</option>

                                <option value="04">04</option>

                                <option value="05">05</option>

                                <option value="06">06</option>

                                <option value="07">07</option>

                                <option value="08">08</option>

                                <option value="09">09</option>

                                <option value="10">10</option>

                                <option value="11">11</option>

                                <option value="12">12</option>

                                <option value="13">13</option>

                                <option value="14">14</option>

                                <option value="15">15</option>

                                <option value="16">16</option>

                                <option value="17">17</option>

                                <option value="18">18</option>

                                <option value="19">19</option>

                                <option value="20">20</option>

                                <option value="21">21</option>

                                <option value="22">22</option>

                                <option value="23">23</option>

                                <option value="24">24</option>

                                <option value="25">25</option>

                                <option value="26">26</option>

                                <option value="27">27</option>

                                <option value="28">28</option>

                                <option value="29">29</option>

                                <option value="30">30</option>

                                <option value="31">31</option>
                              </select>
                            </div>
                            <div class="select-month col">
                              <select name="month" id="month">
                                <option value="">Chọn tháng</option>

                                <option value="01">Tháng 01</option>

                                <option value="02">Tháng 02</option>

                                <option value="03">Tháng 03</option>

                                <option value="04">Tháng 04</option>

                                <option value="05">Tháng 05</option>

                                <option value="06">Tháng 06</option>

                                <option value="07">Tháng 07</option>

                                <option value="08">Tháng 08</option>

                                <option value="09">Tháng 09</option>

                                <option value="10">Tháng 10</option>

                                <option value="11">Tháng 11</option>

                                <option value="12">Tháng 12</option>
                              </select>
                            </div>
                            <div class="select-year col">
                              <select name="year" id="year">
                                <option value="">Chọn năm</option>

                                <option value="2000">2000</option>

                                <option value="2001">2001</option>

                                <option value="2002">2002</option>

                                <option value="2003">2003</option>

                                <option value="2004">2004</option>

                                <option value="2005">2005</option>

                                <option value="2006">2006</option>

                                <option value="2007">2007</option>

                                <option value="2008">2008</option>

                                <option value="2009">2009</option>

                                <option value="2010">2010</option>

                                <option value="2011">2011</option>

                                <option value="2012">2012</option>

                                <option value="2013">2013</option>

                                <option value="2014">2014</option>

                                <option value="2015">2015</option>

                                <option value="2016">2016</option>

                                <option value="2017">2017</option>

                                <option value="2018">2018</option>

                                <option value="2019">2019</option>

                                <option value="2020">2020</option>

                                <option value="2021">2021</option>

                                <option value="2022">2022</option>

                                <option value="2023">2023</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="row-input" style="margin-top:15px">
								<label style="font-weight:600;margin-bottom:7px;display: inline-block">Nhập giờ hẹn: <span style="color:#f00">*</span> </label>
								<div class="wrap-input" style="text-align:center">

									<input type="text" class="input" name="giohen" id="giohen">

								</div>

							</div> -->
                      </div>
                      <!-- Thông tin của sen -->
                      <h5 class="text-center">Thông tin của bạn</h5>

                      <div>
                        <form action="">
                          <div class="form-group">
                            <label for="formGroupExampleInput">Họ và tên</label>
                            <input
                              type="text"
                              class="form-control"
                              id="formGroupExampleInput"
                              placeholder="Nhập vào tên vật nuôi"
                            />
                          </div>
                          <div class="form-group">
                            <label for="formGroupExampleInput"
                              >Số điện thoại</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="formGroupExampleInput"
                              placeholder="Nhập vào tên vật nuôi"
                            />
                          </div>
                          <div class="form-group">
                            <label for="formGroupExampleInput">Địa chỉ</label>
                            <input
                              type="text"
                              class="form-control"
                              id="formGroupExampleInput"
                              placeholder="Nhập vào tên vật nuôi"
                            />
                          </div>
                          <div class="form-group">
                            <label for="formGroupExampleInput">Email</label>
                            <input
                              type="text"
                              class="form-control"
                              id="formGroupExampleInput"
                              placeholder="Nhập vào tên vật nuôi"
                            />
                          </div>
                          <!-- <div>
                    <button type="button" class="btn btn-primary">
                  Đặt lịch ngay
                </button>
                  </div> -->
                        </form>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Hủy
                  </button>
                  <button type="button" class="btn btn-primary">
                    Đặt lịch ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col py-5 text-center mx-4 rounded text-name">Giữ nuôi</div>
      </div>
    </div>

    </div>
   
  </main>
  <PublicFooters/>

</template>
<style>
@import'./Booking.module.css'
</style>
