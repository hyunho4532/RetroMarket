<template>
  <div ref="topNavigation">
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

            <li class="nav-item" style="background-color: #fefefe; color: red;" v-if="userEmail">
              <span class="nav-link" @click="logout" style="font-size: 16px; font-weight: bold">계정 탈퇴</span>
            </li>
          </ul>

          <ul class="navbar-nav">
            <li class="nav-item" style="background-color: #fefefe" v-if="userEmail">
              <span class="nav-link" style="font-size: 16px; font-weight: bold">{{ userEmail }}</span>
            </li>

            <li class="nav-item" style="background-color: #fefefe; margin-left: 8px; margin-top: 4px;">
              <img src="./asset/google.png" width="30" height="30" @click="loginWithGoogle" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>

import {onAuthStateChanged, getAuth, signInWithPopup, GoogleAuthProvider, EmailAuthProvider} from 'firebase/auth';
import {topNavigationAnimation} from "@/views/gsap/top-navigation-animation";

export default {
  name: 'MainPage',

  data() {
    return {
      userEmail: "이메일을 입력해주세요",
      password: "",
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

    topNavigationAnimation(this.$refs.topNavigation);
  },

  methods: {
    logout() {
      const auth = getAuth();

      const credential = EmailAuthProvider.credential(this.userEmail, this.password); // Use the user's email and password

      auth.currentUser.reauthenticateWithCredential(credential)
          .then(() => {
            auth.currentUser.delete()
                .then(() => {
                  alert('탈퇴 처리가 정상적으로 됐습니다');
                })
                .catch((error) => {
                  // Handle deletion error
                  console.error('Error deleting account:', error);
                });
          })
          .catch((error) => {
            console.error('Error reauthenticating:', error);
          });
    },

    async loginWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        await this.registerUser(user.email);

        this.userEmail = user.email;
      } catch (error) {
        console.error(`Error with Google: ${error}`);
      }
    }
  },

  async registerUser(email) {
    return email;
  }
}
</script>

<style lang="scss">
@import "../components/navibar/css/base.scss";
</style>