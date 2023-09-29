<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">중고월드</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav" style="padding-left: 30px;">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">홈</a>
          </li>
          <li class="nav-item">
            <router-link to="/used/trade">중고 거래</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">알바 구함 (알구)</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">소통 게시판</a>
          </li>
        </ul>

        <form class="d-flex" id="form" role="search">
          <input class="form-control me-2" type="search" placeholder="검색어를 입력하세요" aria-label="Search" id="input-search">
          <button class="btn btn-outline-success" type="submit">검색 완료</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@import './css/base.scss';
</style>