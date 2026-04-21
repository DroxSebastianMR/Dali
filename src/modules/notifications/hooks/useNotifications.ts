import { notificationsService } from "@/src/infrastructure/api/notifications/notifications.service";
import { handleNotification } from "@/src/modules/notifications/handlers/notification.handler";
import { NotificationService } from "@/src/modules/notifications/services/notifications.service";
import { useEffect } from "react";

export const useNotifications = () => {
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const granted = await NotificationService.requestPermissions();
    if (!granted) return;

    const token = await NotificationService.getPushToken();

    if (token) {
      await notificationsService.registerPushToken(token);
    }

    NotificationService.onReceive((notif) => {
      handleNotification(notif.request.content.data);
    });

    NotificationService.onResponse((response) => {
      handleNotification(response.notification.request.content.data);
    });
  };
};
