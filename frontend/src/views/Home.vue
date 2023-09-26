<template>
  <div>
    <button @click="openModal">모달 열기</button>
    <ModalDialog ref="modalDialog">
      <button @click="closeModal">닫기</button>
    </ModalDialog>
  </div>
</template>

<script>
import ModalDialog from "@/components/Modal-Dialog.vue";

export default {

  name: 'MainPage',

  components: {
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