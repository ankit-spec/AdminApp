// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import AuthNavigator from './AuthStack';
// function MainNavigator() {

//   return (
//     <NavigationContainer>
//      <AuthNavigator/>
//     </NavigationContainer>
//   );
// }

// export default MainNavigator;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthStack';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import RootNavigator from './RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PhoneSigninScreen,OtpScreen,RegistrationScreen,BussinessIdScreen} from '../screens';
import AppTabNavigator from './AppTabNavigator';
const MainStack = createStackNavigator();

 function  MainNavigator () {
let loginkey
  AsyncStorage.getItem('loginkey').then(suceess=>{
    console.log(suceess,'sucess')
    
  })
 
  const code=useSelector(state=>state.authEmployee)
console.log(code,'code')
//   const usertoken = useSelector(state => state.auth.token)
 const id=useSelector(state=>state.auth.id)
//   console.log(id,'id')
//   console.log(usertoken, 'token');
//   const first_time = useSelector(state => state.auth.firsttime);
//   console.log(first_time, 'firsttime');
//     const inapp = useSelector(state => state.auth.firsttimeinapp);
//     console.log(inapp,'llllll')
//   //  const data=useSelector(state=>state.auth.data)
//   const value = AsyncStorage.getItem('@storage_Key');
// //  console.log(value, 'value');
  return (
    <NavigationContainer>
      {/* <MainStack.Navigator headerMode="none">
        {xxx == '' || xxx !='' ? (
          <>{AuthNavigator(MainStack)}</>
        ) : 
        xxx==undefined&&
        (
       
          <>{RootNavigator(MainStack)}</>
        )
        :
        (
          <>{RootNavigator(MainStack)}</>

        )
        }
      </MainStack.Navigator> */}
      <MainStack.Navigator headerMode="none">
        {/* <MainStack.Screen name="PhoneSingin" component={PhoneSigninScreen} />
        <MainStack.Screen name="OtpScreen" component={OtpScreen} />
        <MainStack.Screen name="Signup" component={RegistrationScreen} />
        <MainStack.Screen name="home" component={AppTabNavigator} />   */}
{/*     
        {usertoken == '' ||
        (usertoken === undefined && first_time == false) ||
        first_time === undefined  && id=='' || id===undefined? (
          <>{AuthNavigator(MainStack)}</>
        ) : usertoken !== ''   &&inapp===undefined ? (
          <>{RegisterNavigator(MainStack)}</>
        ) :usertoken == undefined ||
        inapp==true && id!=='' ?
          <>{RootNavigator(MainStack)}</>:null
        }    */}
 
        { id=='' || id===undefined? (
          <>{AuthNavigator(MainStack)}</>
        
        ) : id!=='' ?
          <>{RootNavigator(MainStack)}</>:null
        }    
          </MainStack.Navigator>   
          {/* {/* {code.code=='Success'?
          <>{RootNavigator(MainStack)}</>:
            <>{AuthNavigator(MainStack)}</>
          }
          </MainStack.Navigator>  */}
           {/* <MainStack.Screen
    
    name="PhoneSingin" component={PhoneSigninScreen} /> 
    <MainStack.Screen name="OtpScreen" component={OtpScreen} /> 
   <MainStack.Screen name="Signup" component={RegistrationScreen} />
    <MainStack.Screen name="BussinessId" component={BussinessIdScreen} />   
    <MainStack.Screen name="AppTabNavigator" component={AppTabNavigator} />

      </MainStack.Navigator>    */}
    </NavigationContainer>
  );
}

export default MainNavigator;

