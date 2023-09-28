<template>
  <div>
    <NaviBar>

    </NaviBar>

    <SwiperBody>

    </SwiperBody>

    <h5 style="padding-left: 30px; padding-top: 50px;">
      최근 판매되고 있는 물품들
    </h5>

    <CardBody>

    </CardBody>
    <button @click="openModal" class="btn btn-primary" style="margin: 30px;">물품 등록하기</button>
    <ModalDialog ref="modalDialog">
      <button @click="closeModal">닫기</button>
    </ModalDialog>
  </div>
</template>

<script>
import ModalDialog from "@/components/Modal-Dialog.vue";
import CardBody from "@/components/card/CardBody.vue";
import NaviBar from "@/components/navibar/NaviBar.vue";
import SwiperBody from "@/components/swiper/SwiperBody.vue";

export default {

  name: 'MainPage',

  components: {
    NaviBar,
    SwiperBody,
    CardBody,
    ModalDialog
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