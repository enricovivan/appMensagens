import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Message from './screens/Message/Message';
import MessageList from './screens/MessageList/MessageList';

import store from './stores/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <Stack.Navigator initialRouteName='Lista de Mensagens'>
            <Stack.Screen name='Contato' component={Message} options={{headerShown: false}}/>
            <Stack.Screen name='Lista de Mensagens' component={MessageList}/>
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
    
    
  )
}
