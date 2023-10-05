<template>
  <div class="card-container">
    <div
        v-for="item in filteredCardData"
        :key="item.id"
        class="card"
        style="width: 24rem; height: 30rem; margin-top: 30px; margin-left: 30px; margin-bottom: 20px;"
    >
      <div class="card-body" @click="openProductDetailModal(item.address)">
        <h5 class="card-title">주소: {{ item.address }}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary" style="margin-top: 12px;">상품: {{ item.product }}</h6>
        <h6 class="card-subtitle mb-2 text-body-secondary" style="margin-top: 12px;">카테고리: {{ item.category }}</h6>
        <p class="card-text" style="margin-top: 60px; font-size: 16px;">판매 이유: {{ item.reason }}</p>
        <p class="card-text" style="margin-top: 20px;">가격: {{ item.price }}원</p>
      </div>

      <div>
        <p class="card-text" style="margin-top: 20px; text-align: end; margin-right: 10px; font-size: 18px;">상품 등록 날짜: {{ item.todayDate }}</p>
        <div style="display: flex; justify-items: end; justify-content: end; margin-bottom: 10px;">
          <button style="color: black; border: none; background: none;" @click="incrementInterest(item.id)">관심</button>
          <p class="card-text" v-text="getInterestValue(item.address)" style="text-align: end; margin-right: 10px; margin-left: 10px;"></p>
        </div>
        <p style="text-align: end; margin-right: 10px; color: royalblue;" @click="openChatModal(item.address)">채팅하기</p>
      </div>
    </div>
  </div>

  <ProductDetailDialog ref="productDetailDialog">
    <button @click="closeProductDetailModal">닫기</button>
  </ProductDetailDialog>

  <ChatDialog ref="chatDialog" @joinRoom="joinChatRoom">
    <button @click="closeChatModal">닫기</button>
  </ChatDialog>
</template>

<script>
import axios from 'axios';
import ChatDialog from "@/components/chat/Chat-Dialog.vue";
import ProductDetailDialog from "@/components/products/detail/Product-Detail-Dialog.vue";

export default {
  data() {
    return {
      cardData: [],
      interestValues: {},
    };
  },
  components: {
    ProductDetailDialog,
    ChatDialog,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openChatModal(productId) {
      const roomId = `room_${productId}`;
      this.$refs.chatDialog.openChatModal(roomId);
    },
    closeChatModal() {
      this.$refs.chatDialog.closeChatModal();
    },
    joinChatRoom(roomId) {
      this.$emit('joinRoom', roomId);
    },

    openProductDetailModal(address) {
      this.$refs.productDetailDialog.openProductDetailModal(address);
    },

    closeProductDetailModal() {
      this.$refs.productDetailDialog.closeProductDetailModal();
    },

    incrementInterest(cardId) {
      if (cardId in this.interestValues) {
        this.interestValues[cardId]++;
      } else {
        this.interestValues[cardId] = 1;
      }
    },

    getInterestValue(address) {
      console.log(address);
      return this.interestValues[address] || 0;
    }
  },
  computed: {
    filteredCardData() {
      if (this.products && this.products.length > 0) {
        return this.cardData.filter(item => this.products.includes(item.id));
      }
      return this.cardData;
    },
  },
  mounted() {
    axios
        .post('http://localhost:8081/data', {}, { withCredentials: true })
        .then(response => {
          this.cardData = response.data;
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
