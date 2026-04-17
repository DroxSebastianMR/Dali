export type NotificationType =
  | "ORDER_READY"
  | "PROMOTION"
  | "SYSTEM"
  | "REMINDER";

export type AppNotification = {
  type: NotificationType;
  title: string;
  body: string;
  data?: any;
};
