import "react-native-gesture-handler";
import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";
import EditWord from "./screens/EditWord";
import { COLORS } from "./constants";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#474747",
          },
          headerTitleStyle: { color: "#a55493" },
        }}
      >
        <Stack.Screen
          name="AllWords"
          component={AllWords}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddWord"
          component={AddWord}
          options={{
            title: "Adding word",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="EditWord"
          component={EditWord}
          options={{ headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <AllWords />
    // // <AddWord />
    // // <EditWord />
  );
}
