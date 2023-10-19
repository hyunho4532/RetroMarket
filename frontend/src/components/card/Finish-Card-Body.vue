<template>
  <div class="card-container" ref="finishCardBody">
    <div
        v-for="item in filteredCardData"
        :key="item.id"
        class="card"
        id="card-finish-container"
    >
      <div class="card-body" @click="openProductDetailModal(item.address, item.id)">
        <h5 class="card-finish-product-status">{{ item.product_status }}</h5>
        <h5 class="card-finish-address">주소: {{ item.address }}</h5>
        <h6 class="card-finish-product">상품: {{ item.product }}</h6>
        <img v-if="item.imageUrl" :src="item.imageUrl" alt="Product Image" style="width: 120px; height: auto; margin-top: 10px">
        <h6 class="card-finish-category">카테고리: {{ item.category }}</h6>
        <p class="card-finish-reason">판매 이유: {{ item.reason }}</p>
        <p class="card-finish-price">가격: {{ item.price }}원</p>
      </div>

      <div>
        <p class="card-finish-date">상품 등록 날짜: {{ item.todayDate }}</p>
        <div class="card-finish-interest">
          <button class="card-finish-interest-button" @click="incrementInterestValue(item.id)">관심</button>
          <p class="card-finish-interest-text" v-text="getInterestValue(item.id)"></p>
        </div>

        <div class="card-finish-chat-or-delete">
          <p style="text-align: end; margin-right: 10px; color: royalblue;" @click="openChatModal(item.id)">채팅하기</p>
          <p v-if="isUserLoggedIn && currentUserUid === item.uid" style="text-align: end; margin-right: 10px; color: red;" @click="deleteChatModal(item.id)">삭제</p>
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
import {finishCardBody} from "@/components/card/gsap/card-body-animation";

export default {
  data() {
    return {
      cardData: [],
      interestValues: {},
    };
  },

  setup() {
    const isUserLoggedIn = ref(false);
    const currentUserUid = ref(null);

    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isUserLoggedIn.value = !!user;
        currentUserUid.value = user ? user.uid : null;
      });
    });

    return {
      isUserLoggedIn,
      currentUserUid
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

    incrementInterestValue(cardId) {
      if (cardId in this.interestValues) {
        this.interestValues[cardId]++;
      } else {
        this.interestValues[cardId] = 1;
      }

      this.saveDataToLocalStorage();
    },

    markItemAsSold(address) {
      const item = this.cardData.find(item => item.address === address);

      if (item) {
        item.status = '판매 완료';
        this.saveDataToLocalStorage();
      }
    },

    saveDataToLocalStorage() {
      localStorage.setItem('interestValues', JSON.stringify(this.interestValues));
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
          this.loadInterestData();
        })
        .catch(error => {
          console.log(error);
        });

    finishCardBody(this.$refs.finishCardBody);
  },
};
</script>

<style lang="scss">
@import "scss/finish-card-body";
</style>