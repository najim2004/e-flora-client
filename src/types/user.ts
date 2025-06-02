export interface User {
  _id: string;
  name: string;
  role: "user" | "admin";
  email: string;
  profileImage: string;
}

export interface appPreferences {
  preferredLanguage: string;
  measurementUnits: string;
  dataSavingMode: boolean;
}

export interface accountSettings {
  securitySettings: {
    twoFactorAuthentication: boolean;
    loginNotifications: boolean;
    activeSessions: string[];
  };
  notificationSettings: {
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    types: {
      weatherAlerts: boolean;
      diseaseOutbreaks: boolean;
      marketPrices: boolean;
      systemUpdates: boolean;
      tipsAndRecommendations: boolean;
    };
  };
  privacySettings: {
    profileVisibility: {
      showToOtherFarmers: boolean;
      showLocationOnMap: boolean;
    };
    dataUsage: {
      shareAnonymousFarmingData: boolean;
      personalizedRecommendations: boolean;
    };
  };
}

export interface PersonalDetails extends User {
  occupation: string;
  location: string;
  bannerImage: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
}
