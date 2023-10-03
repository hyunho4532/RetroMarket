<template>
  <div>
    <SwiperBody></SwiperBody>

    <div class="recent-items" style="display: flex;">
      <h5>최근에 판매되고 있는 물품들</h5>
      <input type="text" class="form-control" v-model="searchAddress" style="width: 240px; height: 30px; margin-left: 12px;" placeholder="주소 검색">
      <button class="btn btn-primary" @click="searchProducts" style="margin-left: 16px; height: 35px;">검색</button>
    </div>

    <CardBody :products="searchResults" @open-chat="openChatModal"></CardBody>

    <button type="button" class="btn btn-primary" id="product-insert-button" @click="openModal">물품 등록하기</button>
    <ModalDialog ref="modalDialog">
      <button @click="closeModal">닫기</button>
    </ModalDialog>
  </div>
</template>

<script>
import SwiperBody from "@/components/swiper/SwiperBody.vue";
import CardBody from "@/components/card/CardBody.vue";
import ModalDialog from "@/components/Modal-Dialog.vue";
import axios from "axios";

export default {

  name: 'MainPage',

  data() {
    return {
      searchAddress: "",
      searchResults: []
    }
  },

  components: {
    ModalDialog,
    SwiperBody,
    CardBody
  },

  methods: {
    openModal() {
      this.$refs.modalDialog.openModal();
    },
    closeModal() {
      this.$refs.modalDialog.closeModal();
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
}
</script>

<style lang="scss">
@import "css/recent-items.scss";
</style>