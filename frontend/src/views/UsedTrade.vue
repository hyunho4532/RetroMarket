<script>
import {animateUsedTradeTitle} from "@/views/gsap/used-trade-animation";
import PopularCardBody from "@/components/card/Popular-Card-Body.vue";
import SelectAllCardBody from "@/components/card/SelectAll-Card-Body.vue";

export default {
  name: 'UsedTrade',

  data() {
    return {
      searchResults: [],
      searchProduct: '',
    }
  },

  mounted() {
    animateUsedTradeTitle(this.$refs.recentPopularItems);
  },

  components: {
    SelectAllCardBody,
    PopularCardBody,
  }
}
</script>
<template>
  <div>
    <div class="recent-popular-items" style="display: flex" ref="recentPopularItems">
      <h4>레트로 마켓 인기 물품들</h4>
    </div>
  </div>

  <PopularCardBody :products="searchResults"></PopularCardBody>

  <div class="recent-items" style="display: flex; margin-top: 60px; margin-left: 20px;" ref="recentItems">
    <input v-model="searchProduct" type="text" class="form-control" style="width: 240px; height: 30px; margin-left: 12px;" placeholder="원하시는 상품을 입력하세요.">
    <button class="btn btn-primary" style="margin-left: 16px; height: 35px;">검색</button>
  </div>

  <SelectAllCardBody :products="searchResults" :searchProduct="searchProduct"></SelectAllCardBody>
</template>

<style lang="scss">
@import "./css/recent-popular-items";
</style>