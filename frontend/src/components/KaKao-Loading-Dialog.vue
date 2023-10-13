<template>
  <div class="modal" tabindex="-1" v-if="showKaKaoModalDialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" ref="productModalInsert">
          <h5 class="modal-title">상담 센터 조회 중!</h5>
        </div>
        <div class="modal-body">
          <div>
            <iframe src="https://pf.kakao.com/_xcaSjG/chat" frameborder="0" style="width: 100%; height: 100vh;"></iframe>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

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
<script>
export default {
  data() {
    return {
      showKaKaoModalDialog: false,
    }
  },

  methods: {
    openModal() {
      this.showKaKaoModalDialog = true;
    },
    closeModal() {
      this.showKaKaoModalDialog = false;
    },
  }
}
</script>