<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">중고월드</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" style="padding-left: 30px;">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">홈</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/used/trade">중고 거래</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">알바 구함 (알구)</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/chat">채팅</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="downloadSample">다운로드</a>
            </li>
          </ul>

          <form class="d-flex" id="form" role="search">
            <input class="form-control me-2" type="search" placeholder="검색어를 입력하세요" aria-label="Search" id="input-search">
            <button class="btn btn-outline-success" type="submit">검색 완료</button>
          </form>

          <ul class="navbar-nav">
            <li class="nav-item" style="background-color: #fefefe" v-if="!userEmail">
              <router-link class="nav-link" to="/login" style="font-size: 16px; font-weight: bold">로그인</router-link>
            </li>

            <li class="nav-item" style="background-color: #fefefe" v-if="!userEmail">
              <router-link class="nav-link" to="/register" style="font-size: 16px; font-weight: bold">회원 가입</router-link>
            </li>

            <li class="nav-item" style="background-color: #fefefe" v-if="userEmail">
              <span class="nav-link" @click="logout" style="font-size: 16px; font-weight: bold">로그 아웃</span>
            </li>
          </ul>

          <ul class="navbar-nav">
            <li class="nav-item" style="background-color: #fefefe" v-if="userEmail">
              <span class="nav-link" style="font-size: 16px; font-weight: bold">{{ userEmail }}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>

import { onAuthStateChanged, getAuth } from 'firebase/auth';

export default {
  name: 'MainPage',

  data() {
    return {
      userEmail: "이메일을 입력해주세요"
    };
  },

  mounted() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = "회원가입을 진행해주세요";
      }
    });
  },

  methods: {
    logout() {
      const auth = getAuth();

      auth.signOut();

      alert('로그아웃이 정상적으로 됐습니다');
    }
  },
}
</script>

<style lang="scss">
@import "../components/navibar/css/base.scss";
</style>