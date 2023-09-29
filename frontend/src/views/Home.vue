<template>
  <div>
    <SwiperBody></SwiperBody>

    <div class="recent-items">
      <h5>최근에 판매되고 있는 물품들</h5>
    </div>

    <CardBody></CardBody>
  </div>
</template>

<script>
import SwiperBody from "@/components/swiper/SwiperBody.vue";
import CardBody from "@/components/card/CardBody.vue";

export default {

  name: 'MainPage',

  components: {
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