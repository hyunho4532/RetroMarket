<template>
  <div class="modal" tabindex="-1" v-if="showModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">상세 정보</h5>
        </div>
        <div class="modal-body">
          <div style="margin-top: 8px;">주문 번호: {{ idValue }}</div>
          <div style="margin-top: 20px;">주소: {{ addressValue }}</div>
          <div id="map" style="width: 800px; height: 400px; margin-top: 30px;">

          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="completeOrder(idValue)">닫기</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeProductDetailModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showModal: false,
      addressValue: '',
      idValue: '',
      map: null,
      marker: null,
    }
  },

  props: {
    address: String,
  },

  methods: {
    closeProductDetailModal() {
      this.showModal = false
    },

    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      if (window.kakao && window.kakao.maps) {
        this.map = new kakao.maps.Map(container, options);
      } else {
        const script = document.createElement("script");
        script.onload = () => {
          this.map = new kakao.maps.Map(container, options);
        };
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0&libraries=services";
        document.head.appendChild(script);
      }

      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(this.addressValue, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const position = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          const marker = new window.kakao.maps.Marker({
            position: position,
          });

          marker.setMap(this.map);

          this.map.panTo(position);
        } else {
          console.error("주소를 좌표로 변환하는 중 오류 발생: ", status);
        }
      });
    },

    openProductDetailModal(address, itemId) {
      this.addressValue = address;
      this.idValue = itemId;
      this.showModal = true

      console.log(address);
      console.log(itemId);

      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0&libraries=services";
        document.head.appendChild(script);
      }
    },

    completeOrder(productId) {
      axios.put(`http://localhost:8081/data/product/${productId}`)
          .then(response => {
            console.log('업데이트 완료');
            this.closeProductDetailModal();
          })
          .catch(error => {
            console.log(`전송 중 ${error}`);
          });
    }
  }
}
</script>

<style>
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
</style>