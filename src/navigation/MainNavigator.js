import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthStack';
function MainNavigator() {

  return (
    <NavigationContainer>
     <AuthNavigator/>
    </NavigationContainer>
  );
}

export default MainNavigator;
