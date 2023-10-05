<script>
import ChatDialog from "@/components/chat/dialog/Chat-Dialog.vue";

export default {
  components: {ChatDialog},
  props: ['chatRooms'],

  data() {
    return {
      selectedRoom: "",
    }
  },

  methods: {
    openDialog(room) {
      this.selectedRoom = room;
      this.$refs.modalDialog.openChatModal();
    },

    closeDialog() {
      this.selectedRoom = null;
    }
  }
}
</script>

<template>
  <div>
    <h2 style="margin: 30px;">채팅방 목록</h2>
    <ul style="margin-left: 30px;">
      <li v-for="room in chatRooms" :key="room.id" @click="openDialog(room)">{{ room.name }}</li>
    </ul>

    <ChatDialog ref="modalDialog" :selectedRoomName="selectedRoom ? selectedRoom.name : ''"></ChatDialog>
  </div>
</template>