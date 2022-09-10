import { BASE_API } from "@/utils/constants";
import axios from "axios";
import VueCookies from "vue-cookies";

let token = VueCookies.get("token");
let config = {
  headers: {
    Authorization: `Basic ${btoa(token + ":" + "x")}`,
  },
};

export const actions = {
  async userAuth({ commit }, payload) {
    commit("API_SUCCESS", false);
    commit("SET_ERR_MSG", "");
    try {
      const { data } = await axios.post(
        `${BASE_API}/users/auth`,
        {},
        {
          headers: {
            Authorization: `Basic ${btoa(
              payload.username + ":" + payload.password
            )}`,
          },
        }
      );
      console.log(data);
      commit("API_SUCCESS", true);
      if (data.status == "login") {
        await VueCookies.set("token", data.auth_token);
        setTimeout(() => {
          location.reload();
        }, 50);
      }
    } catch (e) {
      console.log(e);
      commit(
        "SET_ERR_MSG",
        e.response && e.response.data
          ? e.response.data.message
          : e.message || "Something went wrong" || "Something went wrong"
      );
    }
  },

  async fetchTimeZone({ commit }) {
    try {
      const { data } = await axios.get("http://worldtimeapi.org/api/timezone");
      commit("SET_TIMEZONES", data);
    } catch (e) {
      console.log(e);
      commit("SET_ERR_MSG", e.message || "Something went wrong");
    }
  },

  async createUser({ commit }, payload) {
    commit("API_SUCCESS", false);
    commit("SET_ERR_MSG", "");
    try {
      const { data } = await axios.post(`${BASE_API}/users`, payload, config);
      console.log(data);
      commit("API_SUCCESS", true);
    } catch (e) {
      console.log(e);
      if (
        e.response &&
        e.response.data.field_errors &&
        e.response.data.field_errors.length > 0
      ) {
        commit(
          "SET_ERR_MSG",
          e.response.data.field_errors[0].field_name +
            ", " +
            e.response.data.field_errors[0].field_message
        );
      } else {
        commit(
          "SET_ERR_MSG",
          e.response && e.response.data
            ? e.response.data.message
            : e.message || "Something went wrong"
        );
      }
    }
  },

  async fetchUsers({ commit }) {
    commit("API_SUCCESS", false);
    commit("SET_ERR_MSG", "");
    try {
      const { data } = await axios.get(
        `${BASE_API}/users?sort=first_name:asc&include=settings&query=queue_id:4&page=1&per_page=10`,
        config
      );
      console.log(data);
      commit("API_SUCCESS", true);
      commit("SET_USERS", data);
    } catch (e) {
      console.log(e);
      commit(
        "SET_ERR_MSG",
        e.response && e.response.data
          ? e.response.data.message
          : e.message || "Something went wrong" || "Something went wrong"
      );
    }
  },

  async deleteUserById({ commit }, userId) {
    commit("API_SUCCESS", false);
    commit("SET_ERR_MSG", "");
    try {
      const { data } = await axios.put(
        `${BASE_API}/users/${userId}/toggle_active`,
        {},
        config
      );
      console.log(data);
      commit("API_SUCCESS", true);
    } catch (e) {
      console.log(e);
      commit(
        "SET_ERR_MSG",
        e.response && e.response.data
          ? e.response.data.message
          : e.message || "Something went wrong" || "Something went wrong"
      );
    }
  },

  /****************************** Skills actions ************************************/

  async createSkill({ commit }, payload) {
    commit("API_SUCCESS", false);
    commit("SET_ERR_MSG", "");
    try {
      const { data } = await axios.post(
        `${BASE_API}/library/skills`,
        payload,
        config
      );
      console.log(data);
      commit("API_SUCCESS", true);
    } catch (e) {
      console.log(e);
      commit(
        "SET_ERR_MSG",
        e.response && e.response.data
          ? e.response.data.message
          : e.message || "Something went wrong"
      );
    }
  },

  async fetchSkills({ commit }) {
    commit("API_SUCCESS", false);
    commit("SET_ERR_MSG", "");
    try {
      const { data } = await axios.get(`${BASE_API}/library/skills`, config);
      console.log(data);
      commit("API_SUCCESS", true);
      commit("SET_SKILLS", data);
    } catch (e) {
      console.log(e);
      commit(
        "SET_ERR_MSG",
        e.response && e.response.data
          ? e.response.data.message
          : e.message || "Something went wrong" || "Something went wrong"
      );
    }
  },
};
