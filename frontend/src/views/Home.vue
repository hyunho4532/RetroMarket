<template>
  <div>
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

export default {

  name: 'MainPage',

  components: {
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