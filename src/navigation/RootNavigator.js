import React from 'react';
import {PhoneSigninScreen, OtpScreen, RegistrationScreen} from '../screens';
import AppTabNavigator from './AppTabNavigator';

function RootNavigator(MainStack) {
  return (
    <>
      <MainStack.Screen name="AppTabNavigator" component={AppTabNavigator} />
     

    </>
  );
}

export default RootNavigator;
