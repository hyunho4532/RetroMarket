<template>
  <div>
    <div id="map" style="width: 830px; height: 500px; margin-bottom: 30px;"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      markers: [],
      map: null,
      watchId: null, // watchPosition의 ID를 저장할 변수 추가
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5535b1f319fbb968a0cc0d3ba2cfe872&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {

    initializeMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);

      this.marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(0, 0),
      });

      this.marker.setMap(this.map);

      this.updateMarkerPosition();
    },

    updateMarkerPosition() {
      const geocoder = new kakao.map.services.Geocoder();
      geocoder.addressSearch(this.addressValue, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const position = new kakao.maps.LatLng(result[0].y, result[0].x);
          this.marker.setPosition(position);
          this.map.panTo(position);
        } else {
          console.error("주소를 좌표로 변환하는 중 오류 발생: ", status);
        }
      });
    },

    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      // 지도 객체를 등록합니다.
      // 지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);

      this.marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(33.450701, 126.570667),
      });

      this.marker.setMap(this.map);

      if (navigator.geolocation) {
        // 사용자의 위치 추적 시작
        this.watchId = navigator.geolocation.watchPosition((position) => {
          const newPosition = new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
          );

          // 현재 위치로 마커 업데이트
          this.marker.setPosition(newPosition);

          // 지도 중심을 현재 위치로 이동
          this.map.setCenter(newPosition);

          // 좌표를 주소로 변환
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(
              position.coords.longitude,
              position.coords.latitude,
              (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const address = result[0].address;
                  if (address && address.address_name) {
                    // 주소 데이터를 부모 컴포넌트로 전달하는 이벤트 발생
                    this.$emit("address-updated", address.address_name);
                  } else {
                    console.error("주소 데이터를 찾을 수 없습니다.");
                  }
                } else {
                  console.error("주소 변환 중 오류 발생:", status);
                }
              }
          );
        });

        // 이전 위치 추적 이벤트 해제 (새로 등록한 핸들러만 유지)
        if (this.watchId) {
          navigator.geolocation.clearWatch(this.watchId);
        }
      }

      // 지도 이동 이벤트 리스너 등록
      window.kakao.maps.event.addListener(this.map, "dragend", () => {
        // 지도 화면 이동이 끝날 때 호출되는 함수
        // 마커의 위치를 업데이트하고 주소를 조회하여 주소 데이터를 부모 컴포넌트로 전달
        const newPosition = this.map.getCenter();
        this.marker.setPosition(newPosition);

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(
            newPosition.getLng(),
            newPosition.getLat(),
            (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].address;
                if (address && address.address_name) {
                  this.$emit("address-updated", address.address_name);
                } else {
                  console.error("주소 데이터를 찾을 수 없습니다.");
                }
              } else {
                console.error("주소 변환 중 오류 발생:", status);
              }
            }
        );
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 400px;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>