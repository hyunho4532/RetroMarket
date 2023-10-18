<template>
  <div class="modal" tabindex="-1" v-if="showModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" ref="productModalInsert">
          <h5 class="modal-title">게시글 신고</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">주문 번호 {{ this.productId }} 번, 신고합니다.</label>
          </div>

          <div class="mb-3" style="margin-top: 40px;">
            <label for="exampleFormControlInput1" class="form-label">신고 날짜</label>
            <input type="text" class="form-control" v-model="currentTime" name="todayDate" id="todayDate" readonly="readonly">
          </div>

          <div class="mb-3" style="margin-top: 60px;">
            <label for="exampleFormControlInput2" class="form-label">해당 게시글을 신고하는 이유를 알려주세요~!</label>
          </div>
        </div>

        <div class="container text-center" style="margin-bottom: 80px;">
          <select id="selectDeclaration" class="form-select" aria-label="Default select example">
            <option selected>신고 사유</option>
            <option value="부적절한 제목/내용">부 적절한 제목/내용</option>
            <option value="사기">사기</option>
            <option value="거래 / 환불 싸움">거래 / 환불 싸움</option>
            <option value="기타 사항">기타 사항</option>
          </select>
        </div>

        <div v-if="document.querySelector('#selectDeclaration').val().equals('기타 사항')" class="mb-3" style="margin-top: 40px;">
          <label for="exampleFormControlInput1" class="form-label">기타 사항 내용 작성</label>
          <textarea type="text" class="form-control" />
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">닫기</button>
          <button type="button" class="btn btn-primary" @click="registerItem">물품 신고하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import gsap from "gsap";

const storage = getStorage();

export default {

  name: 'ModalDialog',

  data() {
    function getCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    return {
      showModal: false,
      currentTime: getCurrentTime(),
      map: null,
      address: "",
      selectedCategory: "",
      productId: "",
      etcValue: "",
    };
  },

  methods: {

    async handleImageUpload(event) {
      const file = event.target.files[0];
      const mountainsRef = ref(storage, 'images/' + file.name);

      try {
        await uploadBytes(mountainsRef, file);
        this.imageUrl = await getDownloadURL(mountainsRef);
      } catch (error) {
        console.log(error);
      }
    },

    registerItem() {
      const id = document.getElementById('id').value;
      const address = document.getElementById('address').value;
      const product = document.getElementById('product').value;
      const category = document.getElementById('category').value;
      const reason = document.getElementById('reason').value;
      const product_status = document.getElementById('product_status').value;
      const price = document.getElementById('price').value;
      const todayDate = document.getElementById('todayDate').value;

      const imageUrl = this.imageUrl;

      const itemData = {
        id,
        address,
        product,
        category,
        reason,
        imageUrl,
        product_status,
        price,
        todayDate,
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

    openModal(productId) {
      this.showModal = true;
      this.productId = productId;

    },
    closeModal() {
      this.showModal = false;
    },
  },

  mounted() {
    const productModalInsert = this.$refs.productModalInsert;
    gsap.from(productModalInsert, {x: 100, duration: 3});

    const productModalId = this.$refs.productId;
    gsap.from(productModalId, { x: 100, duration: 2 });
  }
};
</script>

<style scoped>
.modal {
  display: block;
  justify-content: center;
  z-index: 1;
  left: 0;
  top: 0;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  padding-top: 60px;
  padding-right: 400px;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 900px;
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