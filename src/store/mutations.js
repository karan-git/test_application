export const mutations = {
  API_SUCCESS(state, payload) {
    state.apiSuccess = payload;
  },
  SET_ERR_MSG(state, payload) {
    state.errorMsg = payload;
  },
  SET_TIMEZONES(state, payload) {
    state.timezones = payload;
  },
  SET_USERS(state, payload) {
    state.users = payload;
  },
  SET_SKILLS(state, payload) {
    state.skills = payload;
  },
};
