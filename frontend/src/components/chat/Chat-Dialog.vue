<template>
  <div class="modal" tabindex="-1" v-if="showModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">중고 채팅방</h5>
          <input v-model="messageInput" @keyup.enter="sendMessage" placeholder="메시지 입력" style="margin-left: 12px;" />
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeChatModal"></button>
        </div>
        <div class="modal-body">
          <div class="messages">
            <div v-for="(message, index) in messages" :key="index">
              {{ message }}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeChatModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {

  name: 'ChatDialog',

  data() {
    return {
      messages: [],
      messageInput: '',
      socket: io('http://localhost:3000'),
      showModal: false,
    }
  },

  mounted() {
    this.socket.on('chatMessage', (message) => {
      this.messages.push(message);
    });
  },

  methods: {
    openChatModal() {
      this.showModal = true;
    },

    closeChatModal() {
      this.showModal = false;
    },

    sendMessage() {
      if (this.messageInput) {
        this.socket.emit('chatMessage', this.messageInput);
        this.messageInput = '';
      }
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  padding-top: 60px;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 800px;
  height: 800px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

</style>