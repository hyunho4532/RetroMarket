import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        chatMessages: {},
    },

    mutations: {
        addChatMessage(state, { roomId, message }) {
            if (!state.chatMessages[roomId]) {
                state.chatMessages[roomId] = [];
            }
            state.chatMessages[roomId].push(message);
        }
    }
})