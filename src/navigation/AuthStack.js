import React from 'react';
import {
  PhoneSigninScreen,
  OtpScreen,
  RegistrationScreen,
  BussinessIdScreen,
  DashboardScreen,
  AddSerivce,
  ShowEmployees,
  ProfileScreen
} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import HomeHeader from '../components/Header/HomeHeader';
import AppTabNavigator from './AppTabNavigator';
const MainStack = createStackNavigator();
const DashboardScreenn=createStackNavigator()
function DashboardNavigator() {
  return (
    <DashboardScreenn.Navigator >
      {/* <MainStack.Screen
    
      name="PhoneSingin" component={PhoneSigninScreen} /> */}
   
      <DashboardScreenn.Screen name="Dashboard" component={DashboardScreen} 
      options={{header: () => <HomeHeader />, headerTransparent: true}}

      />

    </DashboardScreenn.Navigator>
  );
}

function AuthNavigator() {
  return (
    <>
     <MainStack.Screen
    
      name="PhoneSingin" component={PhoneSigninScreen} /> 
      <MainStack.Screen name="OtpScreen" component={OtpScreen} /> 
     <MainStack.Screen name="Signup" component={RegistrationScreen} />
      <MainStack.Screen name="BussinessId" component={BussinessIdScreen} />  
       </>

 
  );
}

export default AuthNavigator;
