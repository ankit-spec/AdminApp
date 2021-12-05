import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';
import HomeIcon from '../assets/icons2/home_icon.svg';
import ProfileActive from '../assets/icons2/ProfileActive.svg'
import CalendarIcon from '../assets/icons2/calendar_icon.svg';
import PlusIcon from '../assets/icons2/plus_icon.svg';
import DocumentIcon from '../assets/icons2/document_icon.svg';
import ProfileIcon from '../assets/icons2/profile_icon.svg';
import {moderateScale, verticalScale} from '../styles/responsiveStyles';
import Calendarhiglight from '../assets/icons2/calendarhiglight.svg';
import Homelight from '../assets/icons2/homehighlight.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {AddEmployee, AddSerivce, AppointmentScreen, DocumentScreen, EmployeeDetails, ProfileScreen, ShowEmployees, ShowService} from '../screens';
import HomeHeader from '../components/Header/HomeHeader';
import Xyx from '../assets/icons/Xyx.svg'
import { DashboardScreen } from '../screens';
import Header2 from '../components/Header/Header2';
const BookingStack = createStackNavigator();
const HomeStack=createStackNavigator()
const ProfileStack = createStackNavigator();
const MapStack=createStackNavigator();
const CalendarStack=createStackNavigator()
const HomeNavigator = () => {
    return (
      <HomeStack.Navigator >
        <HomeStack.Screen
          name="calendar"
          component={DashboardScreen}
          options={{header: () => <HomeHeader 
          title='רשימת תורים'
          />, headerTransparent: true}}
        />
      </HomeStack.Navigator>
    );
  };
const CalendarNavigator = (props) => {
  return (
    <CalendarStack.Navigator >
      <CalendarStack.Screen
        name="calendar"
        component={ShowEmployees}
       
        options={{header: () => <Header2
            title='הוספת שירות חדש ליומן'
            onPressback={()=>{
              props.navigation.goBack()
            }}
            />, 
        headerTransparent: true}}
      />  
     
       <CalendarStack.Screen
        name="details"
        component={EmployeeDetails}
      
        options={{header: () => <Header2
          onPressback={()=>{
            props.navigation.navigate('calendar')
          }}
            title='הוספת שירות חדש ליומן'
            />, 
        headerTransparent: true}}
      />
         <CalendarStack.Screen
        name="showService"
        component={ShowService}
       
        options={{header: () => <Header2
         onPressback={()=>{
            props.navigation.navigate('details')
          }}
            title='הוספת שירות חדש ליומן'
            />, 
        headerTransparent: true}}
      />
          <CalendarStack.Screen
        name="AddService"
        component={AddSerivce}
      
        options={{header: () => <HomeHeader
          onPressback={()=>{
          props.navigation.navigate('showService')
        }}
            //title='הוספת שירות חדש ליומן'
            />, 
            
        headerTransparent: true}}
      />
    </CalendarStack.Navigator>
  );
};
const BookingNavigator = () => {
  return (
    <BookingStack.Navigator initialRouteName="SelectProfessional">
      <BookingStack.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{header: () => <HomeHeader
          title='קביעת תור חדש'
          />, headerTransparent: true}}
      />
    </BookingStack.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
       // options={{header: () => <HomeHeader />, headerTransparent: true}}
      />
    </ProfileStack.Navigator>
  );
};

const MapNavigator=()=>{
  return(
    <MapStack.Navigator headerMode='none'>
      <MapStack.Screen
      name='document'
      component={DocumentScreen}
     
      />
    </MapStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
  return (
    <Tab.Navigator
    
    initialRouteName="home"

      tabBarOptions={{
        showLabel: false,
        style: {
          ...Platform.select({
            ios: {
             height: verticalScale(85)
            },
            android: {
              height: verticalScale(65)

            },
          }),
          borderTopLeftRadius: moderateScale(15),
          borderTopRightRadius: moderateScale(15),
        },
      }}>
      <Tab.Screen

      initialRouteName='home'
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({focused, size}) => {
            let iconColor;

            if (focused) {
              return (
                <View>
                  <View style={{alignSelf: 'center'}}>
                    <ProfileActive
                      />
                  </View>
                </View>
              );
            } else {
              return (
                <View>
                  <View style={{alignSelf: 'center'}}>
                    <ProfileIcon />
                  </View>
                </View>
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="document"
        component={MapNavigator}
        options={{
          tabBarIcon: ({focused, size}) => {
            let iconColor;
            if (focused) {
              return (
                <View>
                  <View style={{alignSelf: 'center'}}>
                   <Xyx color={'red'}/>
                  </View>
                </View>
              );
            } else {
              return (
                <View>
                  <View style={{alignSelf: 'center'}}>
                  <DocumentIcon color={'red'} />

                  </View>
                </View>
              );
            }

          },
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={BookingNavigator}
        options={{
          tabBarIcon: ({focused, size}) => {
            let iconColor;

           
            return (
              <TouchableOpacity>
                <View
                  style={{
                    alignSelf: 'center',
                    height: 48,
                    width: 48,
                    backgroundColor: '#20304F',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 16,
                  }}>
                  <PlusIcon color={iconColor} />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />

      <Tab.Screen
        name="calender"
        component={CalendarNavigator}
        options={{
          tabBarIcon: ({focused, size}) => {
            let iconColor;

            if (focused) {
              return (
                <View>
                  <View style={{alignSelf: 'center'}}>
                    <Calendarhiglight />
                  </View>
                </View>
              );
            } else {
              return (
                <View>
                  <View style={{alignSelf: 'center'}}>
                    <CalendarIcon  />
                  </View>
                </View>
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({focused, size}) => {
            let iconColor;

            if (focused) {
              return (
                <View>
                  <View style={{alignSelf: 'center'}}>
                    <Homelight  />
                  </View>
                </View>
              );
            } else {
              return (
                <View>
                  <View style={{alignSelf: 'center'}}>
                    <HomeIcon  />
                  </View>
                </View>
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
