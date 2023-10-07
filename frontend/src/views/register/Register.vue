<template>
  <div class="form">
    <h3 class="register-title">회원가입</h3>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">이메일</span>
      <input type="text" class="form-control" v-model="email" name="email" placeholder="이메일을 입력해주세요!">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">패스워드</span>
      <input type="password" class="form-control" v-model="password" name="password" placeholder="패스워드를 입력해주세요!">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">닉네임</span>
      <input type="nickname" class="form-control" name="nickname" placeholder="닉네임을 입력해주세요!">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">전화번호</span>
      <input type="phonenumber" class="form-control" name="phonenumber" placeholder="전화번호를 입력해주세요!">
    </div>

    <div>
      <button id="register-button" v-on:click="signUp" class="btn btn-primary">회원가입</button>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            alert('회원가입 완료')
          })
          .catch(error => {
            alert('에러 : ' + error.message)
          });
    }
  }
}
</script>

<style lang="scss">
@import "css/register.scss";
</style>