<template>
  <div class="card-container">
    <div v-for="item in filteredCardData" :key="item.id" class="card" style="width: 24rem; height: 22rem; margin-top: 30px; margin-left: 30px; margin-bottom: 20px;">
      <div class="card-body">
        <h5 class="card-title">주소: {{ item.address }}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary" style="margin-top: 12px;">상품: {{ item.product }}</h6>
        <p class="card-text" style="margin-top: 60px; font-size: 16px;">판매 이유: {{ item.reason }}</p>
        <p class="card-text" style="margin-top: 20px;">가격: {{ item.price }}원</p>
      </div>

      <div>
        <p class="card-text" style="margin-top: 20px; text-align: end; margin-right: 10px; font-size: 18px;">상품 등록 날짜: {{ item.todayDate }}</p>
        <p style="text-align: end; margin-right: 10px; color: royalblue;" @click="openChatModal">채팅하기</p>
      </div>
    </div>
  </div>

  <ChatDialog ref="chatDialog">
    <button @click="closeChatModal">닫기</button>
  </ChatDialog>
</template>

<script>
import axios from 'axios';
import ChatDialog from "@/components/chat/Chat-Dialog.vue";

export default {
  data() {
    return {
      cardData: '',
    };
  },

  components: {
    ChatDialog
  },

  props: {
    products: {
      type: Array,
      required: true,
    }
  },

  methods: {
    openChatModal() {
      this.$refs.chatDialog.openChatModal();
    },

    closeChatModal() {
      this.$refs.chatDialog.closeChatModal();
    },
  },

  computed: {
    filteredCardData() {
      if (this.products && this.products.length > 0) {
        return this.cardData.filter(item => this.products.includes(item.id))
      }

      console.log(this.cardData);

      return this.cardData;
    }
  },

  mounted() {
    axios.post('http://localhost:8081/data',  {
      withCredentials: true,
    })
        .then(response => {
          this.cardData = response.data;

          console.log(this.cardData);
        })
        .catch(error => {
          console.log(error);
        });
  },
};

</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>