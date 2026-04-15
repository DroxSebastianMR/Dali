import { useEffect } from "react";
import { NotificationService } from "../services/notifications.service";

export const useNotifications = () => {
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const granted = await NotificationService.requestPermissions();

    if (!granted) return;
    await NotificationService.scheduleLocalNotification();
  };
};
