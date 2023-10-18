<template>
  <div class="card-container" ref="cardElement">
    <div
        v-for="item in filteredCardData"
        :key="item.id"
        class="card"
        id="process-card-container"
    >
      <div class="card-body" @click="openProductDetailModal(item.address, item.interestValues, item.id)">
        <h5 class="card-process-product-status">{{ item.product_status }}</h5>
        <h5 class="card-process-address">주소: {{ item.address }}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary" style="margin-top: 40px; font-size: 12px;">상품: {{ item.product }}</h6>
        <img v-if="item.imageUrl" :src="item.imageUrl" alt="Product Image" style="width: 120px; height: auto; margin-top: 10px">
        <h6 class="card-process-category">카테고리: {{ item.category }}</h6>
        <p class="card-process-reason">판매 이유: {{ item.reason }}</p>
        <p class="card-process-price">가격: {{ item.price }}원</p>
      </div>

      <div>
        <p class="card-process-date">상품 등록 날짜: {{ item.todayDate }}</p>
        <div class="card-process-interest">
          <button class="card-process-interest-button" @click="incrementInterest(item.id)">관심</button>
          <p class="card-process-interest-text" v-text="getInterestValue(item.id)"></p>
        </div>

        <div class="card-process-chat-or-delete">
          <p class="card-process-chat-text" v-if="isUserLoggedIn && currentUserUid" @click="openChatModal(item.id)">채팅하기</p>
          <p class="card-process-delete-text" v-if="isUserLoggedIn" @click="deleteChatModal(item.id)">삭제</p>
        </div>

        <div class="card-process-declaration">
          <p class="card-process-declaration-text" v-if="isUserLoggedIn && currentUserUid" @click="openDeclarationModal(item.id)">신고하기</p>
        </div>
      </div>
    </div>
  </div>

  <div class="pagination-controls" style="margin-bottom: 40px;">
    <button style="margin-left: 34px;" class="btn btn-primary" @click="prevPage">이전</button>
    <span style="margin-left: 20px; margin-right: 20px;"> {{ pageNum }} of {{ totalPages }}</span>
    <button class="btn btn-primary" @click="nextPage">다음</button>
  </div>

  <ProductDeclarationDialog ref="productDeclarationDialog">
    <button @click="closeDeclarationModal">닫기</button>
  </ProductDeclarationDialog>

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
import ProductDeclarationDialog from "@/components/products/declaration/Product-Declaration-Dialog.vue";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {filteringCardBody} from "@/components/card/gsap/card-body-animation";
import {requestProcessCardSendData} from "@/components/api/process-card-body";

export default {
  data() {
    return {
      cardData: [],
      interestValues: {},

      pageNum: 1,
      pageSize: 2,
      totalItems: 0,
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
    ProductDeclarationDialog,
    ChatDialog,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },

    searchProduct: {
      type: String,
      default: '',
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
      this.$refs.productDetailDialog.openProductDetailModal(address, interest, itemId);
    },

    openDeclarationModal(productId) {
      this.$refs.productDeclarationDialog.openModal(productId);
    },

    closeDeclarationModal() {
      this.$refs.productDeclarationDialog.closeModal();
    },

    closeProductDetailModal() {
      this.$refs.productDetailDialog.closeProductDetailModal();
    },

    incrementInterest(cardId) {
      if (cardId in this.interestValues) {
        this.interestValues[cardId]++;
      } else {
        this.interestValues[cardId] = 1; // Use $set to make Vue aware of the new property
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

    getInterestValue(address) {
      return this.interestValues[address] || 0;
    },

    saveDataToLocalStorage() {
      localStorage.setItem('interestValues', JSON.stringify(this.interestValues));
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
            this.totalItems = this.cardData.length;
            this.loadInterestData();
          })
          .catch(error => {
            console.error(error);
          })
    },

    nextPage() {
      const totalPages = Math.ceil(this.totalItems)
      if (this.pageNum < totalPages) {
        this.pageNum++;
      }
    },

    prevPage() {
      if (this.pageNum > 1) {
        this.pageNum--;
      }
    }
  },
  computed: {
    filteredCardData() {
      console.log(this.searchProduct)

      let filteredData = this.cardData.filter(item => {
        return item.product.includes(this.searchProduct);
      });

      const start = (this.pageNum - 1) * this.pageSize;
      const end = start + this.pageSize;
      filteredData = filteredData.slice(start, end);

      return filteredData;
    },

    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    }
  },

  mounted() {
    this.getProcessCardLoadData();

    filteringCardBody(this.$refs.cardElement);
  },
};
</script>

<style lang="scss">
@import "scss/process-card-body";
</style>