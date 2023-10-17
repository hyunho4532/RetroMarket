<template>
    <div class="modal" tabindex="-1" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" ref="productModalInsert">
            <h5 class="modal-title">물품 등록</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">

            <div class="mb-3">
              <KaKaoMap @address-updated="onAddressUpdated" />
              <input type="email" name="address"  class="form-control" id="address" :value="address" placeholder="ex) 서울시 강동구" readonly="readonly">
            </div>

            <div class="mb-3" ref="productId">
              <input type="text" name="id"  class="form-control" id="id">
            </div>

            <div class="mb-3" style="margin-top: 40px;">
              <label for="exampleFormControlInput1" class="form-label">물품 이름</label>
              <input type="text" name="product" class="form-control" id="product" placeholder="ex) 닌텐도 스위치">
            </div>

            <div style="display: flex;">
              <select
                  class="form-select" aria-label="Default select example"
                  style="width: 250px; height: 40px; margin-top: 40px; margin-right: 20px;"
                  v-model="selectedCategory"
                  @change="updateCategoryInput"
              >
                <option selected>기타</option>
                <option value="뷰티">뷰티</option>
                <option value="도서">도서</option>
                <option value="건강/피트니스">건강/피트니스</option>
                <option value="스포츠">스포츠</option>
                <option value="전자기기/부품">전자기기/부품</option>
              </select>

              <div class="mb-3" style="margin-top: 40px;">
                <input type="text" name="reason" class="form-control" id="category" v-model="selectedCategory" readonly="readonly">
              </div>
            </div>

            <div class="mb-3" style="margin-top: 40px;">
              <label for="exampleFormControlInput1" class="form-label">판매하는 이유</label>
              <input type="text" name="reason" class="form-control" id="reason" placeholder="ex) 장식품이 되어버림">
            </div>

            <div class="mb-3" style="margin-top: 40px;">
              <label for="exampleFormControlInput1" class="form-label">제품 이미지</label>
              <input type="file" name="product_image" class="form-control" id="product_image" @change="handleImageUpload">
              <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" style="max-width: 300px; margin-top: 10px;" />
            </div>

            <select class="form-select" id="product_state" aria-label="Default select example">
              <option selected>제품 상태</option>
              <option value="좋음">좋음</option>
              <option value="보통">보통</option>
              <option value="나쁨">나쁨</option>
            </select>

            <div style="display: flex; margin-top: 40px;">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="판매 중" id="product_status">
                <label class="form-check-label" for="flexCheckChecked">
                  판매 중
                </label>
              </div>

              <div class="form-check" style="margin-left: 20px;">
                <input class="form-check-input" type="checkbox" value="판매 완료" id="product_status" checked>
                <label class="form-check-label" for="flexCheckDefault">
                  판매 완료
                </label>
              </div>
            </div>

            <div class="mb-3" style="margin-top: 40px;">
              <label for="exampleFormControlInput1" class="form-label">가격</label>
              <input type="text" class="form-control" name="price" id="price">
            </div>

            <div class="mb-3" style="margin-top: 40px;">
              <label for="exampleFormControlInput1" class="form-label">현재 날짜</label>
              <input type="text" class="form-control" v-model="currentTime" name="todayDate" id="todayDate" readonly="readonly">
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
import KaKaoMap from "@/components/api/KaKaoMap.vue";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import gsap from "gsap";

const storage = getStorage();

export default {

  name: 'ModalDialog',
  components: {
    KaKaoMap,
  },

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
    };
  },

  methods: {

    async handleImageUpload(event) {
      const file = event.target.files[0];
      const mountainsRef = ref(storage, 'images/' + file.name);

      try {
        await uploadBytes(mountainsRef, file);
        this.imageUrl = await getDownloadURL(mountainsRef);
        this.$emit('image-uploaded', this.imageUrl);
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
      const product_image = document.getElementById('product_image').value;
      const product_state = document.getElementById('product_state').value;
      const product_status = document.getElementById('product_status').value;
      const price = document.getElementById('price').value;
      const todayDate = document.getElementById('todayDate').value;

      const itemData = {
        id,
        address,
        product,
        category,
        reason,
        product_image,
        product_state,
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

    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },

    onAddressUpdated(address) {
      this.address = address;

      console.log(this.address);
    },

    updateCategoryInput() {
      const categoryInput = document.getElementById('category');
      categoryInput.value = this.selectedCategory;
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