<template>
  <div class="form">
    <h3 class="register-title" ref="registerTitle">회원가입</h3>
    <div class="input-group mb-3" ref="registerEmail">
      <span class="input-group-text" style="width: 200px;">이메일</span>
      <input type="text" class="form-control" v-model="email" id="email" placeholder="이메일을 입력해주세요!">
    </div>

    <div class="input-group mb-3" ref="registerPassword">
      <span class="input-group-text" style="width: 200px;">패스워드</span>
      <input type="password" class="form-control" v-model="password" id="password" placeholder="패스워드를 입력해주세요!">
    </div>

    <div class="input-group mb-3" ref="registerNickname">
      <span class="input-group-text" style="width: 200px;">닉네임</span>
      <input type="text" class="form-control" id="nickname" placeholder="닉네임을 입력해주세요!">
    </div>

    <div class="input-group mb-3" ref="registerPhoneNumber">
      <span class="input-group-text" style="width: 200px;">전화번호</span>
      <input type="text" class="form-control" id="phone_number" placeholder="전화번호를 입력해주세요!">
    </div>

    <div ref="registerRegisterButton">
      <button id="register-button" v-on:click="signUp" class="btn btn-primary">회원가입</button>
    </div>
  </div>
</template>

<script>
import {
  animateRegisterTitle,
  animateRegisterEmail,
  animateRegisterPassword,
  animateRegisterNickname,
  animateRegisterPhoneNumber,
  animateRegisterButton
} from "@/views/register/gsap/register-animation";
import { firebaseAuthRegister } from "@/views/auth/auth";
import {registerUserDataSend} from "@/api/register";

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    signUp() {

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const nickname = document.getElementById('nickname').value;
      const phone_number = document.getElementById('phone_number').value;

      firebaseAuthRegister(this.email, this.password)
          .then(user => {
            alert(`회원 가입 완료. 사용자 정보: ${JSON.stringify(user)}`);
          })
          .catch(error => {
            alert('에러: ' + error.message);
          });

      const itemData = {
        email,
        password,
        nickname,
        phone_number,
      }

      registerUserDataSend(itemData);
    }
  },

  mounted() {
    animateRegisterTitle(this.$refs.registerTitle);
    animateRegisterEmail(this.$refs.registerEmail);
    animateRegisterPassword(this.$refs.registerPassword);
    animateRegisterNickname(this.$refs.registerNickname);
    animateRegisterPhoneNumber(this.$refs.registerPhoneNumber);
    animateRegisterButton(this.$refs.registerRegisterButton);
  }
}
</script>

<style lang="scss">
@import "css/register.scss";
</style>