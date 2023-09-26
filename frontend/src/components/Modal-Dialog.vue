<template>
    <div class="modal" tabindex="-1" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">물품 등록</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">주소 입력</label>
              <input type="email" name="address"  class="form-control" id="address" placeholder="ex) 서울시 강동구">
            </div>

            <div class="mb-3" style="margin-top: 40px;">
              <label for="exampleFormControlInput1" class="form-label">물품 이름</label>
              <input type="text" name="product" class="form-control" id="product" placeholder="ex) 닌텐도 스위치">
            </div>

            <div class="mb-3" style="margin-top: 40px;">
              <label for="exampleFormControlInput1" class="form-label">판매하는 이유</label>
              <input type="text" name="reason" class="form-control" id="reason" placeholder="ex) 장식품이 되어버림">
            </div>

            <div class="mb-3" style="margin-top: 40px;">
              <label for="exampleFormControlInput1" class="form-label">가격</label>
              <input type="text" class="form-control" name="price" id="price">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">닫기</button>
            <button type="button" class="btn btn-primary" @click="registerItem">물품 등록하기</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {

  name: 'ModalDialog',

  data() {
    return {
      showModal: false
    };
  },
  methods: {
    registerItem() {
      const itemData = {
        address: this.address,
        product: this.product,
        reason: this.reason,
        price: this.price,
      }

      axios.post('http://localhost:8081/api/registerItem', itemData, {
        withCredentials: true
      })
          .then(response => {
            console.log(response.data);
            this.closeModal();
          })
          .catch(error => {
            console.log(error);
          });
    },

    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  padding-top: 60px;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>