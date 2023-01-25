import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

import Register from './Register';
import Login from './Login';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import ViewAll from './ViewAll';
import MovieDetails from './MovieDetails';
import OrderPage from './OrderPage';
import PaymentPage from './PaymentPage';
import Profil from './Profil';
import OrderHistory from './OrderHistory';
import TicketResult from './TicketResult';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Main = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          {!token && (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{headerShown: false}}
              />
            </>
          )}
          {token && (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ViewAll"
                component={ViewAll}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MovieDetails"
                component={MovieDetails}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="OrderPage"
                component={OrderPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PaymentPage"
                component={PaymentPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Profil"
                component={Profil}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="OrderHistory"
                component={OrderHistory}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TicketResult"
                component={TicketResult}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default Main;
