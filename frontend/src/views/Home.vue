<template>
  <div>
    <SwiperBody></SwiperBody>

    <CategoryCardBody :products="searchResults" :selectedCategory="selectedCategory" @open-chat="openChatModal"></CategoryCardBody>

    <div class="recent-items" style="display: flex;" ref="recentItems">
      <select v-model="selected">
        <option selected>기타</option>
        <option value="뷰티">뷰티</option>
        <option value="도서">도서</option>
        <option value="건강/피트니스">건강/피트니스</option>
        <option value="스포츠">스포츠</option>
        <option value="전자기기/부품">전자기기/부품</option>
      </select>

      {{ selected }}

      <button class="btn btn-primary" @click="searchProducts" style="margin-left: 16px; height: 35px;">조회</button>
    </div>

    <ProcessCardBody :products="searchResults" @open-chat="openChatModal"></ProcessCardBody>

    <div class="recent-finish-items" style="display: flex; margin-top: 100px;" ref="recentFinishItems">
      <h5>판매 완료 된 물품</h5>
    </div>

    <FinishCardBody :products="searchResults" @open-chat="openChatModal"></FinishCardBody>

    <div class="recent-progress-items" style="display: flex; margin-top: 100px;" ref="recentProgressItems">
      <h5>현재 판매 중인 물품</h5>
    </div>

    <ProgressCardBody :products="searchResults" @open-chat="openChatModal"></ProgressCardBody>

    <button type="button" class="btn btn-primary" id="product-insert-button" @click="openModal">물품 등록하기</button>

    <ModalDialog ref="modalDialog">
      <button @click="closeModal">닫기</button>
    </ModalDialog>
  </div>
</template>

<script>
import SwiperBody from "@/components/swiper/SwiperBody.vue";
import CategoryCardBody from "@/components/card/category/Category-Card-Body.vue";
import ProcessCardBody from "@/components/card/status/process/Process-Card-Body.vue";
import FinishCardBody from "@/components/card/status/finish/Finish-Card-Body.vue";
import ProgressCardBody from "@/components/card/status/progress/Progress-Card-Body.vue";
import ModalDialog from "@/components/Modal-Dialog.vue";
import gsap from 'gsap';
import axios from "axios";

export default {

  name: 'MainPage',

  data() {
    return {
      products: Array,
      selectedCategory: '',
      selected: '',
    }
  },

  components: {
    ModalDialog,
    SwiperBody,
    CategoryCardBody,
    ProcessCardBody,
    FinishCardBody,
    ProgressCardBody,
  },

  methods: {
    openModal() {
      this.$refs.modalDialog.openModal();
    },
    closeModal() {
      this.$refs.modalDialog.closeModal();
    },

    openChatModal(roomId) {
      this.$refs.chatDialog.openChatModal(roomId);
    },

    searchProducts() {
      try {
        console.log(this.selected);


        const encodeSelected = encodeURIComponent(this.selected);

        const response = axios.get(`http://localhost:8081/api/products?category=${encodeSelected}`);
        this.searchResults = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },

  mounted() {
    const recentItems = this.$refs.recentItems;
    const recentFinishItems = this.$refs.recentFinishItems;
    const recentProgressItems = this.$refs.recentProgressItems;

    gsap.from(recentItems, { opacity: 0, x: 100, duration: 2 })
    gsap.fromTo(recentFinishItems, { x: 100, opacity: 0 }, { x: 0, duration: 1, opacity: 1, delay: 2 })
    gsap.fromTo(recentProgressItems, { x: 100, opacity: 0 }, { x: 0, duration: 1, opacity: 1, delay: 4 })
  }
}
</script>

<style lang="scss">
@import "css/recent-items.scss";
</style>