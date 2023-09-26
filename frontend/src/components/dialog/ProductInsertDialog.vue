<template>
  <!-- 물품 등록 모달 -->
  <div class="modal fade" id="product-insert-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
</template>