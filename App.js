import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen    from './screens/HomeScreen';  // ตั้งชื่อ ว่าอะไร ไฟล์อยู่ที่ไหน
import PlayerScreen from './screens/PlayerScreen'


const Stack = createStackNavigator();  

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"    component={HomeScreen} /> 
        <Stack.Screen name="Player"  component={PlayerScreen} />    
            
          {/* ตั้งชื่อ    component จาก import เพื่อไม่ให้สับสน ตั้งชื่อเดียวกันให้หมด*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}