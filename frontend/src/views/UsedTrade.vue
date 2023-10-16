<script>
import {animateUsedTradeTitle} from "@/views/gsap/used-trade-animation";
import PopularCardBody from "@/components/card/Popular-Card-Body.vue";

export default {
  name: 'UsedTrade',

  data() {
    return {
      searchResults: [],
    }
  },

  mounted() {
    animateUsedTradeTitle(this.$refs.recentPopularItems);
  },

  components: {
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

  <PopularCardBody :products="searchResults"  ></PopularCardBody>
</template>

<style lang="scss">
@import "./css/recent-popular-items";
</style>