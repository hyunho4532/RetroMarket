<template>
  <div>
    <SwiperBody></SwiperBody>

    <div class="recent-items">
      <h5>최근에 판매되고 있는 물품들</h5>
    </div>
    <CardBody></CardBody>

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

export default {

  name: 'MainPage',

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
    }
  }
};
</script>

<style lang="scss">
@import "css/recent-items.scss";
</style>