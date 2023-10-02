<template>
  <div class="modal" tabindex="-1" v-if="showModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">중고 채팅방</h5>
          <div class="mb-3" style="margin-top: 20px; margin-left: 24px;">
            <input v-model="messageInput" @keyup.enter="sendMessage" class="form-control" placeholder="말 걸기">
          </div>
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

export default {
  name: 'ChatDialog',

  data() {
    return {
      messages: [],
      messageInput: '',
      showModal: false,
      roomId: '',
    };
  },

  methods: {
    openChatModal(roomId) {
      this.roomId = roomId;
      this.showModal = true;
      this.connectWebSocket(roomId);
    },

    closeChatModal() {
      this.showModal = false;
      this.disconnectWebSocket();
    },

    connectWebSocket(roomId) {
      const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      this.socket = new WebSocket(`${wsProtocol}://localhost:3000`);

      this.socket.addEventListener('open', () => {
        this.socket.send(JSON.stringify({ type: 'joinRoom', roomId }));
      });

      this.socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'chatMessage') {
          this.messages.push(data.message);
        }
      });

      this.socket.addEventListener('close', () => {
      });
    },

    disconnectWebSocket() {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: 'leaveRoom', roomId: this.roomId }));
        this.socket.close();
      }
    },

    sendMessage() {
      if (this.messageInput) {
        // 채팅 메시지 서버로 전송
        this.socket.send(JSON.stringify({ type: 'chatMessage', room: this.roomId, message: this.messageInput }));
        this.messageInput = '';
      }
    },
  },
};
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
