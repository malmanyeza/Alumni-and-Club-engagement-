import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import DepartmentScreen from './screens/Department';
import ClubScreen from './screens/ClubScreen';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import VotingScreen from './screens/VotingScreen';
import CandidateSelectScreen from './screens/CandidateSelectScreen';
import Timer from './screens/Timer';
import { ConstProvider } from './hooks/useConst';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ConstProvider>
      <Stack.Navigator>
      
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Club" component={ClubScreen} options={{headerShown:false}}/>
      <Stack.Screen name="CandidateSelect" component={CandidateSelectScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Voting" component={VotingScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Main" component={MainScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Department" component={DepartmentScreen} options={{headerShown:false}}/>
      
      
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
      </ConstProvider>
    </NavigationContainer>
  );
}


