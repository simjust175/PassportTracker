import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            userName:"",
            loggedInStatus: false,
            userInfo: {}
        }
    },
    mutations:{
        updatedLoginStat(state, payload) {
            console.log("It works in teh States", payload);
            state.userName = payload.userName
            state.loggedInStatus = payload.stat
        },
    }
})

export default store;