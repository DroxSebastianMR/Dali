import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export class NotificationService {
  static async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  }

  static async scheduleLocalNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔥 Dali",
        body: "Preparte para Dali",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 3,
        repeats: false,
      },
    });
  }

  static async getPushToken() {
    if (!Device.isDevice) return null;

    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  }
}
