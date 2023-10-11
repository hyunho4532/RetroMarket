<template>
  <div class="form">
    <h3 class="login-title" ref="loginTitle">로그인</h3>
    <div class="input-group mb-3" ref="loginEmail">
      <span class="input-group-text" id="basic-addon1">이메일</span>
      <input type="text" class="form-control" v-model="email" name="email" placeholder="이메일을 입력해주세요!">
    </div>

    <div class="input-group mb-3" ref="loginPassword">
      <span class="input-group-text" id="basic-addon1">패스워드</span>
      <input type="password" class="form-control" v-model="password" name="password" placeholder="패스워드를 입력해주세요!">
    </div>

    <div>
      <button id="login-button" ref="loginButton" v-on:click="signIn" class="btn btn-primary">로그인</button>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  animateLoginButton,
  animateLoginEmail,
  animateLoginPassword,
  animateLoginTitle
} from "@/views/login/gsap/login-animation";

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            alert('로그인 완료')
          })
          .catch(error => {
            alert('에러 : ' + error.message)
          });
    }
  },

  mounted() {
    animateLoginTitle(this.$refs.loginTitle);
    animateLoginEmail(this.$refs.loginEmail);
    animateLoginPassword(this.$refs.loginPassword);
    animateLoginButton(this.$refs.loginButton);
  }
}
</script>

<style lang="scss">
@import "css/login";
</style>