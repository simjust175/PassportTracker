import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            userName:"",
            loggedInStatus: false,
            token: null,
            userInfo: {},
            test1: "",
            test2: ""
        }
    },
    mutations:{
        updatedLoginStat(state, payload) {
            console.log("It works in the States", payload);
            state.userName = payload.userName;
            state.loggedInStatus = payload.loggedInStatus;
            state.token = payload.token;
            state.userInfo = payload.userInfo;
            console.log("in the state", state);
        },
        clearStore(state){
            state.userName = "";
            state.loggedInStatus = false;
            state.token = null;
            state.userInfo = {};
        },
        runStoreTest(state, payload){
            state.test1 = payload.testA
            state.test2 = payload.testB
            state.userName = payload.userName
        }
    }
})

export default store;



// const store = createStore({
//   state() {
//     return {
//       loggedInStat: false,
//       userEmail: "",
//       lang: "he",
//       dbContent: []
//     };
//   },
//   mutations: {
//     updateLoggedIn(state, payload) {
//       console.log("🪵👉");
//       state.loggedInStat = payload.loggedStat;
//       state.userEmail = payload.userEmail;
//     },
//     updateUserInfo(state, userEmail) {
//       state.loggedInStat = userEmail;
//     },
//     updateDbContent(state, amountArray) {
//       console.log("called store: ", amountArray);
//       state.dbContent = [...amountArray];
//     },
//     updateLang(state, lang) {
//       console.log("LANGUEGE UPDATE", lang);
//       state.lang = lang;
//     }
//   },
//   // actions:{

//   // }
// });

