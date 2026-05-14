import { HomeStack } from "@/src/app/navigation/stacks/HomeStack";
import { ScannerStack } from "@/src/app/navigation/stacks/ScannerStack";

import { CustomTabBar } from "@/src/modules/system/ui/navigation/CustomTabBar";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type TabParamList = {
  Home: undefined;
  List: undefined;
  Scan: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => {
        const currentRoute = props.state.routes[props.state.index].name;

        return <CustomTabBar {...props} currentRoute={currentRoute} />;
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="List" component={HomeStack} />
      <Tab.Screen name="Scan" component={ScannerStack} />
      <Tab.Screen name="Favorites" component={HomeStack} />
      <Tab.Screen name="Profile" component={HomeStack} />
    </Tab.Navigator>
  );
};
