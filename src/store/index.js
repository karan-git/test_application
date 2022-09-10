import Vue from "vue";
import Vuex from "vuex";
import { actions } from "./actions";
import { mutations } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiSuccess: false,
    errorMsg: "",
    timezones: [],
    users: [],
    skills: [],
  },
  mutations,
  actions,
});
