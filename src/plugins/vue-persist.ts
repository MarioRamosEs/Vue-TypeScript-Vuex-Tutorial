import VuexPersistance from "vuex-persist";

export default new VuexPersistance({
  storage: window.localStorage,
  modules: []
});
