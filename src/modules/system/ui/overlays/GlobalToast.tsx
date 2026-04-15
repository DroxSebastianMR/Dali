import { ToastPayload } from "@/src/modules/system/SystemUI/types";
import { Text, View } from "react-native";

export const GlobalToast = ({ toast }: { toast: ToastPayload }) => {
  const bg =
    toast.type === "error"
      ? "bg-red-600"
      : toast.type === "success"
        ? "bg-green-600"
        : "bg-gray-800";

  return (
    <View
      className={`absolute bottom-10 self-center px-6 py-3 rounded-xl ${bg}`}
    >
      <Text className="text-white font-medium">{toast.message}</Text>
    </View>
  );
};
