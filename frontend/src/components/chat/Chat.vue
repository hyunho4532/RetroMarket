<template>
  <div id="app">
    <ChatRoomCreate @create="addChatRoom" />
    <ChatRoomList :chatRooms="chatRooms" />
  </div>
</template>

<script>
import ChatRoomCreate from '@/components/chat/create/ChatRoomCreate.vue';
import ChatRoomList from '@/components/chat/list/ChatRoomList.vue';

export default {
  name: 'ChatMain',

  data() {
    return {
      chatRooms: [],
    };
  },
  methods: {
    addChatRoom(newRoom) {
      this.chatRooms.push({ id: Date.now(), name: newRoom });
    },
  },
  components: {
    ChatRoomCreate,
    ChatRoomList,
  },
};
</script>