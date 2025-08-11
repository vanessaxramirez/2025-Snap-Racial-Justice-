import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserTab from "./UserTab";
import ConversationScreen from "../screens/ConversationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddFriendScreen from "../screens/AddFriendScreen";
import DiscoverCard from "../components/DiscoverCard";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FriendStory from "../screens/FriendStory";
import AstrologyScreen from "../screens/AstrologyScreen";
import MemoryScreen from "../screens/MemoryScreen";
import EventScreen from "../screens/EventScreen"; //New component by Sona and Christian
import CommunitiesScreen from "../screens/CommunitiesScreen";
import GCSearchScreen from "../screens/GCSearchScreen";
import VerificationScreen from "../screens/VerificationScreen";
import NonProfitScreen from "../screens/NonProfitScreen";
import BadgesScreen from "../screens/BadgesScreen";
import GroupChatScreen from "../screens/GroupChatScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserTab" component={UserTab} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="FriendStory"
          component={FriendStory}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="AddFriend"
          component={AddFriendScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="DiscoverCard"
          component={DiscoverCard}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MemoryScreen"
          component={MemoryScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Astrology"
          component={AstrologyScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Communities"
          component={CommunitiesScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="GC Search"
          component={GCSearchScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Verification Page"
          component={VerificationScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Org Page"
          component={NonProfitScreen}
          // options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Badges"
          component={BadgesScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="General Chat"
          component={GroupChatScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
