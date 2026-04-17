import { AppNotification } from "@/src/modules/notifications/types/notification.types";

export const handleNotification = (notification: AppNotification) => {
  switch (notification.type) {
    case "ORDER_READY":
      console.log("Ir a pantalla de pedido");
      break;

    case "PROMOTION":
      // 👉 abrir promociones
      console.log("Mostrar promociones");
      break;

    case "SYSTEM":
      console.log("Mensaje del sistema");
      break;

    case "REMINDER":
      console.log("Recordatorio");
      break;
  }
};
