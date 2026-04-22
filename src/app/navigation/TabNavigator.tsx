import { HomeStack } from "@/src/app/navigation/stacks/HomeStack";
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
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="List" component={HomeStack} />
      <Tab.Screen name="Scan" component={HomeStack} />
      <Tab.Screen name="Favorites" component={HomeStack} />
      <Tab.Screen name="Profile" component={HomeStack} />
    </Tab.Navigator>
  );
};
