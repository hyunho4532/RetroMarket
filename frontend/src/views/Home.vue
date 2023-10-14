<template>
  <div>
    <SwiperBody></SwiperBody>

    <div class="contact-button-container" ref="contactButtonContainer">
      <button type="button" class="btn btn-primary" id="product-insert-button" @click="openKaKaoModal">문의 하기</button>
    </div>

    <div class="recent-items" style="display: flex;" ref="recentItems">
      <h5>최근에 판매되고 있는 물품들</h5>
      <input type="text" class="form-control" v-model="searchAddress" style="width: 240px; height: 30px; margin-left: 12px;" placeholder="주소 검색">
      <button class="btn btn-primary" @click="searchProducts" style="margin-left: 16px; height: 35px;">검색</button>
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

    <KaKaoLoadingDialog ref="showKaKaoModalDialog">
      <button @click="closeKaKaoModal">닫기</button>
    </KaKaoLoadingDialog>
  </div>
</template>

<script>
import SwiperBody from "@/components/swiper/SwiperBody.vue";
import ProcessCardBody from "@/components/card/Process-Card-Body.vue";
import FinishCardBody from "@/components/card/Finish-Card-Body.vue";
import ProgressCardBody from "@/components/card/Progress-Card-Body.vue";
import ModalDialog from "@/components/Modal-Dialog.vue";
import axios from "axios";
import gsap from 'gsap';
import KaKaoLoadingDialog from "@/components/KaKao-Loading-Dialog.vue";

export default {

  name: 'MainPage',

  data() {
    return {
      searchAddress: "",
      searchResults: []
    }
  },

  components: {
    KaKaoLoadingDialog,
    ModalDialog,
    SwiperBody,
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

    openKaKaoModal() {
      this.$refs.showKaKaoModalDialog.openModal();
    },

    closeKaKaoModal() {
      this.$refs.showKaKaoModalDialog.closeModal();
    },

    searchProducts() {

      const encodedAddress = encodeURIComponent(this.searchAddress);

      axios.post(`http://localhost:8081/products?address=${encodedAddress}`)
          .then(response => {
            this.searchResults = response.data;

            console.log(this.searchResults);
          })
          .catch(error => {
            console.error(error);
          });
    },

    openChatModal(roomId) {
      this.$refs.chatDialog.openChatModal(roomId);
    },
  },

  mounted() {
    const recentItems = this.$refs.recentItems;
    const recentFinishItems = this.$refs.recentFinishItems;
    const recentProgressItems = this.$refs.recentProgressItems;

    gsap.from(recentItems, { opacity: 0, x: 100, duration: 2 })
    gsap.fromTo(recentFinishItems, { x: 100, opacity: 0 }, { x: 0, duration: 1, opacity: 1, delay: 2 })
    gsap.fromTo(recentProgressItems, { x: 100, opacity: 0 }, { x: 0, duration: 1, opacity: 1, delay: 4 })

    const contactButtonContainer = this.$refs.contactButtonContainer;
    const offsetTop = contactButtonContainer.offsetTop;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > offsetTop) {
        contactButtonContainer.classList.add('fixed');
      } else {
        contactButtonContainer.classList.remove('fixed')
      }
    });
  }
}
</script>

<style lang="scss">
@import "css/recent-items.scss";
</style>