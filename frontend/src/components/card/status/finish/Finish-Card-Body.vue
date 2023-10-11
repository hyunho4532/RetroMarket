<template>
  <div class="card-container" ref="finishCardBody">
    <div
        v-for="item in filteredCardData"
        :key="item.id"
        class="card"
        style="width: 28rem; height: 30rem; margin-top: 30px; margin-left: 30px; margin-bottom: 20px;"
    >
      <div class="card-body" @click="openProductDetailModal(item.address, item.id)">
        <h5 class="card-title" style="color: royalblue; font-size: 18px;">{{ item.product_status }}</h5>
        <h5 class="card-title" style="margin-top: 40px;">주소: {{ item.address }}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary" style="margin-top: 40px;">상품: {{ item.product }}</h6>
        <img v-if="item.imageUrl" :src="item.imageUrl" alt="Product Image" style="width: 120px; height: auto; margin-top: 10px">
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

        <div style="display: flex; justify-content: end; text-align: end">
          <p style="text-align: end; margin-right: 10px; color: royalblue;" @click="openChatModal(item.id)">채팅하기</p>
          <p v-if="isUserLoggedIn" style="text-align: end; margin-right: 10px; color: red;" @click="deleteChatModal(item.id)">삭제</p>
        </div>
      </div>
    </div>
  </div>

  <ProductDetailDialog ref="productDetailDialog" @mark-as-sold="markItemAsSold" :address="cardData.address" :itemid="cardData.id">
    <button @click="closeProductDetailModal">닫기</button>
  </ProductDetailDialog>

  <ChatDialog ref="chatDialog" @joinRoom="joinChatRoom">
    <button @click="closeChatModal">닫기</button>
  </ChatDialog>
</template>

<script>
import axios from 'axios';
import ChatDialog from "@/components/chat/dialog/Chat-Dialog.vue";
import ProductDetailDialog from "@/components/products/detail/Product-Detail-Dialog.vue";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {finishCardBody} from "@/components/card/gsap/cardBodyAnimation";

export default {
  data() {
    return {
      cardData: [],
      interestValues: {},
    };
  },

  setup() {
    const isUserLoggedIn = ref(false);

    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isUserLoggedIn.value = !!user;
      });
    });

    return {
      isUserLoggedIn
    }
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

    deleteChatModal(itemId) {
      console.log(itemId);

      // Step 1: Send delete request
      axios.delete(`http://localhost:8081/api/deleteChat/${itemId}`, {
        withCredentials: true
      })
          .then(response => {
            console.log(`Chat with Address ${itemId} deleted successfully!`, response);

            // Step 2: Update data (remove the deleted chat from cardData)
            this.cardData = this.cardData.filter(item => item.id !== itemId);
          })
          .catch(error => {
            console.error(error);
          });
    },

    closeChatModal() {
      this.$refs.chatDialog.closeChatModal();
    },

    joinChatRoom(roomId) {
      this.$emit('joinRoom', roomId);
    },

    openProductDetailModal(address, itemId) {
      this.$refs.productDetailDialog.openProductDetailModal(address, itemId);
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

    markItemAsSold(address) {
      const item = this.cardData.find(item => item.address === address);

      if (item) {
        item.status = '판매 완료';
        this.saveDataToLocalStorage();
      }
    },

    getInterestValue(address) {
      console.log(address);
      return this.interestValues[address] || 0;
    },

    saveDataToLocalStorage() {
      localStorage.setItem('cardData', JSON.stringify(this.cardData));
    }
  },
  computed: {
    filteredCardData() {
      if (this.products && this.products.length > 0) {
        return this.cardData.filter(item => {
          return this.products.includes(item.id) && item.product_status === '판매 완료';
        });
      }

      return this.cardData.filter(item => item.product_status === '판매 완료');
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

    finishCardBody(this.$refs.finishCardBody);
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>