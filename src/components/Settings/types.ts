export interface SettingsNotificationState {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface SettingsAvailabilityState {
  [key: string]: boolean;
}

export interface SettingsState {
  notifications: SettingsNotificationState;
  availability: SettingsAvailabilityState;
}
