const app = {
  state: {
    currentVersion: '',
    emailAddress: '',
    businessAddress: '',
    officialWebsite: '',
    businessCooperation: '',
  },
  mutations: {
    SET_CURRENTVERSION: (state, currentVersion) => {
      state.currentVersion = currentVersion;
    },
    SET_EMAILADDRESS: () => {},
    SET_BUSNIESSADDRESS: () => {},
    SET_OFFICIALWEBSITE: () => {},
    SET_BUSNIESSCOOPERATION: () => {},
  },
  actions: {
  },
};

export default app;
