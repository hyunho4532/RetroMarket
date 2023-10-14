import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

new Vuex.Store({
    state: {
        chatMessages: {},
        interestValues: {},
    },

    mutations: {
        addChatMessage(state, { roomId, message }) {
            if (!state.chatMessages[roomId]) {
                state.chatMessages[roomId] = [];
            }
            state.chatMessages[roomId].push(message);
        },

        incrementInterest(state, { cardId }) {
            if (cardId in state.interestValues) {
                state.interestValues[cardId]++;
            } else {
                state.interestValues[cardId] = 0;
            }
        },
    },

    actions: {
        incrementInterest({ commit }, { cardId }) {
            commit('incrementInterest', { cardId });
        },
    },

    getters: {
        getInterestValue: (state) => (cardId) => {
            return state.interestValues[cardId] || 0;
        },
    },
})