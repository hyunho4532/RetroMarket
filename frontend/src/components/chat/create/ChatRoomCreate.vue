<script>
export default {
  name: 'ChatRoomCreate',

  data() {
    return {
      newChatRoom: '',
    };
  },

  methods: {
    createChatRoom() {
      if (this.newChatRoom.trim() !== '') {
        this.$emit('create', this.newChatRoom);
        this.newChatRoom = '';
      }
    }
  }
}
</script>

<template>
  <h2 style="text-align: center; margin-top: 50px;">중고 채팅방 생성</h2>
  <div style="display: flex;">
    <div class="mb-3" style="margin-top: 40px;">
      <label for="exampleFormControlInput1" class="form-label"></label>
      <input type="text" class="form-control" style="width: 300px; margin-left: 30px;" v-model="newChatRoom">
    </div>
    <button style="height: 40px; margin-top: 60px; margin-left: 20px;" type="button" class="btn btn-primary" @click="createChatRoom">생성</button>
  </div>
</template>

<style>

</style>