<template>
  <div class="card-container" ref="finishCardBody">
    <div
        v-for="item in filteredCardData"
        :key="item.id"
        class="card"
        id="card-progress-container"
    >
      <div class="card-body" @click="openProductDetailModal(item.address, this.interestValues, item.id)">
        <h5 class="card-progress-product-status">{{ item.product_status }}</h5>
        <h5 class="card-progress-product-state">제품 상태: {{ item.product_state }}</h5>
        <h5 class="card-progress-address">주소: {{ item.address }}</h5>
        <h6 class="card-progress-product">상품: {{ item.product }}</h6>
        <img v-if="item.imageUrl" :src="item.imageUrl" alt="Product Image" style="width: 120px; height: auto; margin-top: 10px">
        <h6 class="card-progress-category">카테고리: {{ item.category }}</h6>
        <p class="card-progress-reason">판매 이유: {{ item.reason }}</p>
        <p class="card-progress-price">가격: {{ item.price }}원</p>
      </div>

      <div>
        <p class="card-progress-date">상품 등록 날짜: {{ item.todayDate }}</p>
        <div class="card-progress-interest">
          <button class="card-progress-interest-button" @click="incrementInterest(item.id)">관심</button>
          <p class="card-progress-interest-text" v-text="getInterestValue(item.id)"></p>
        </div>

        <div class="card-progress-chat-or-delete">
          <p class="card-progress-chat-text" style="text-align: end; margin-right: 10px; color: royalblue;" @click="openChatModal(item.id)">채팅하기</p>
          <p class="card-progress-delete-chat" style="text-align: end; margin-right: 10px; color: red;" v-if="isUserLoggedIn" @click="deleteChatModal(item.id)">삭제</p>
        </div>
      </div>
    </div>
  </div>

  <ProductDetailDialog ref="productDetailDialog" @mark-as-sold="markItemAsSold" :address="cardData.address" :interest="cardData.interestValues" :itemid="cardData.id">
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
import {progressCardBody} from "@/components/card/gsap/card-body-animation";
import {requestProcessCardSendData} from "@/components/api/process-card-body";

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

    openProductDetailModal(address, interest, itemId) {
      console.log(interest);

      this.$refs.productDetailDialog.openProductDetailModal(address, interest, itemId);
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

      this.saveDataToLocalStorage();
    },

    saveDataToLocalStorage() {
      localStorage.setItem('interestValues', JSON.stringify(this.interestValues));
    },

    markItemAsSold(address) {
      const item = this.cardData.find(item => item.address === address);

      if (item) {
        item.status = '판매 완료';
        this.saveDataToLocalStorage();
      }
    },

    getInterestValue(cardId) {
      console.log(cardId);
      return this.interestValues[cardId] || 0;
    },

    loadInterestData() {
      const savedData = JSON.parse(localStorage.getItem('interestValues'));

      if (savedData) {
        this.interestValues = savedData;
      }
    },

    getProcessCardLoadData() {
      requestProcessCardSendData()
          .then(response => {
            this.cardData = response.data;
            this.loadInterestData();
          })
          .catch(error => {
            console.error(error);
          })
    },
  },
  computed: {
    filteredCardData() {
      if (this.products && this.products.length > 0) {
        return this.cardData.filter(item => {
          return this.products.includes(item.id) && item.product_status === '판매 중';
        });
      }

      return this.cardData.filter(item => item.product_status === '판매 중');
    },
  },
  mounted() {
    this.getProcessCardLoadData();

    progressCardBody(this.$refs.finishCardBody);
  },
};
</script>

<style lang="scss">
@import "scss/progress-card-body";
</style>