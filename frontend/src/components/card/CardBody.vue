<template>
  <div class="card-container">
    <div v-for="item in cardData" :key="item.id" class="card" style="width: 24rem; height: 22rem; margin-top: 30px; margin-left: 30px; margin-bottom: 20px;">
      <div class="card-body">
        <h5 class="card-title">주소: {{ item.address }}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary" style="margin-top: 12px;">상품: {{ item.product }}</h6>
        <p class="card-text" style="margin-top: 60px; font-size: 16px;">판매 이유: {{ item.reason }}</p>
        <p class="card-text" style="margin-top: 20px;">가격: {{ item.price }}원</p>
      </div>

      <div>
        <p class="card-text" style="margin-top: 20px; text-align: end; margin-right: 10px; font-size: 18px;">상품 등록 날짜: {{ item.todayDate }}</p>
        <p style="text-align: end; margin-right: 10px; color: red;">신고하기</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cardData: '',
    };
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