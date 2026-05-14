import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ScannerScreen } from "@/src/modules/scanner/screens/ScannerScreen";

const Stack = createNativeStackNavigator();

export const ScannerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ScannerMain" component={ScannerScreen} />
    </Stack.Navigator>
  );
};
