import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store new Vuex.Store({
  state: {
    room: {}, // room information
    users: [], // information of users in the room
    accessUserId: null, // information of user who play in this window
    appState: {}
  },
  mutations: {
    setRoom(state, room) {
      state.room = room;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setAccessUserId(state, userId) {
      state.accessUserId = userId;
    },
    setAppState(state, appState) {
      state.appState = appState;
    }
  },
  actions: {
    appState({ state }, obj) {
      let appState = state.room.appState || {};
      Object.keys(obj).forEach(key => {
        appState[key] = obj[key];
      });
      postAppState(appState);
    },
    resetAppState() {
      postAppState({});
    }
    // put original actions here
  },
  getters: {
    accessUser: state => {
      return state.users.find(user => user.id === state.accessUserId);
    }
    // put original getters here
  }
});

// appStateの更新、clinet & server
const postAppState = appState => {
  store.commit("setAppState", appState);
  window.parent.postMessage({ appState }, document.referrer);
};

export default store;
