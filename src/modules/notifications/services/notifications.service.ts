import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export class NotificationService {
  static async requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  }

  static async getPushToken(): Promise<string | null> {
    if (!Device.isDevice) return null;

    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  }

  static onReceive(listener: (notification: any) => void) {
    return Notifications.addNotificationReceivedListener(listener);
  }

  static onResponse(listener: (response: any) => void) {
    return Notifications.addNotificationResponseReceivedListener(listener);
  }

  static async scheduleLocal(notification: { title: string; body: string }) {
    await Notifications.scheduleNotificationAsync({
      content: notification,
      trigger: null,
    });
  }
}
