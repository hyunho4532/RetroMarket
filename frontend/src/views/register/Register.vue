<template>
  <div class="form">
    <h3 class="register-title">회원가입</h3>
    <div class="input-group mb-3">
      <span class="input-group-text">이메일</span>
      <input type="text" class="form-control" v-model="email" id="email" placeholder="이메일을 입력해주세요!">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">패스워드</span>
      <input type="password" class="form-control" v-model="password" id="password" placeholder="패스워드를 입력해주세요!">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">닉네임</span>
      <input type="text" class="form-control" id="nickname" placeholder="닉네임을 입력해주세요!">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">전화번호</span>
      <input type="text" class="form-control" id="phone_number" placeholder="전화번호를 입력해주세요!">
    </div>

    <div>
      <button id="register-button" v-on:click="signUp" class="btn btn-primary">회원가입</button>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from "axios";

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

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            alert('회원가입 완료')
          })
          .catch(error => {
            alert('에러 : ' + error.message)
          });

      const itemData = {
        email,
        password,
        nickname,
        phone_number,
      }

      axios.post('http://localhost:8081/api/registerUser', itemData, {
        withCredentials: true,
      })
          .then(response => {
            console.log(`데이터 요청 완료 ${response.data}`);
          })
          .catch(error => {
            console.log(`데이터 요청 중 에러: ${error}`);
          });
    }
  }
}
</script>

<style lang="scss">
@import "css/register.scss";
</style>