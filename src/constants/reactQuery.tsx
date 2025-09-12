const queryKeys = {
  auth: {
    user: "authUser",
  },

  admin: {
    player: {
      list: "adminPlayerList",
      details: "adminPlayerDetails",
    },
    team: {
      list: "adminTeamList",
      details: "adminTeamDetails",
    },
    site: {
      settings: "adminSiteSettings",
    },
    emailTemplet: {
      list: "adminEmailTempletList",
      details: "adminEmailTempletDetails",
    },
    bidLog: {
      list: "adminBidLogList",
    },
    dashboard: {
      main: "adminDashboard",
    },
  },
};

export default queryKeys;
