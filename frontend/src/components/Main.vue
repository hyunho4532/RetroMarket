<template xmlns:layout="http://www.w3.org/1999/xhtml">
  <div layout:fragment="content">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>

    <div class="product-insert" style="padding-top: 30px;">
      <!-- 물품 등록 버튼 -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#product-insert-modal">물품 등록하기</button>
    </div>

    <div id="app">
      <!-- 물품 등록 모달 -->
      <div v-if="productModalVisible" class="modal fade" id="product-insert-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">중고로 판매할 물품을 입력해주세요~!</h4>
            </div>

            <div class="modal-body">
              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="location">위치</span>
                <input type="text" id="address-input-location" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="selectedAddress">
              </div>

              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="title">제목</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="title">
              </div>

              <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="content">내용</span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="content">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text" id="image">상품 이미지 업로드</span>
                <input type="file" class="form-control" id="image-input" accept="image/*" @change="handleImageChange">
              </div>

              <img id="selected-image" :src="selectedImage" alt="샘플이미지" style="width: 250px; height: 500px;">
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="product-modal-insert-click" @click="registerProduct">물품 등록하기</button>
              <button type="button" class="btn btn-default" data-dismiss="modal" id="product-modal-close" @click="closeProductModal">닫기</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 주소 조회 팝업 -->
      <div v-if="addressDialogVisible" class="modal fade" id="show-address-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="my-address-select">주소를 입력하여 조회해주세요!</h4>
            </div>
            <div class="modal-body">
              <input type="text" id="address-input" placeholder="주소를 입력하세요" v-model="addressInput">
              <button id="search-button" @click="searchAddress">조회</button>
              <div id="address-list-view">
                <ul>
                  <li v-for="address in addresses" v-bind:key="address" @click="setSelectedAddress(address)">{{ address }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}

</script>