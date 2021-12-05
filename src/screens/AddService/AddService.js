//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Input from '../../components/Input/Input';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../styles/responsiveStyles';
import Button from '../../components/Button/Button';
import {showError, showSuccess} from '../../utils/helperFunction';
import AddCircle from '../../assets/icons/add-circle.svg';
import RemoveCircle from '../../assets/icons/remove-circle.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CREATE_SERVICE, UPDATE_SERVICES} from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {windowWidth} from '../../utils/measurement';
import {colors} from '../../styles/colors';
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

const AddSerivce = ({navigation, route}) => {
  const [serviceName, setserviceName] = useState(
    route.params.item ? route.params.item.name : '',
  );
  const [servicePrice, setservicePrice] = useState(
    route.params.item ? route.params.item.price : '',
  );
  const [servicetTime, setservicetTime] = useState(
    route.params.item ? route.params.item.time.toString() : '',
  );
  const [addnewService, setaddnewService] = useState(
    route.params.item ? route.params.item.description : '',
  );
  const [count, setCount] = useState(
    route.params.item ? route.params.item.maximumQueue : 0,
  );

  useEffect(() => {
    console.log(servicetTime, 'time');
  });

  const isValidData1 = async () => {
    if (serviceName == '') {
      showError('Please enter your Service Name');
      return;
    }
    if (servicetTime == '') {
      showError('Please enter your Service Time');
      return;
    }

    const value = await AsyncStorage.getItem('@storage_Key');

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body:
        servicePrice !== '' && addnewService !== ''
          ? JSON.stringify({
              name: serviceName,
              description: addnewService,
              time: servicetTime,
              price: servicePrice,
              maximumQueue: count,
              employeeId: route.params.importid ? route.params.importid : '',
            })
          : servicePrice !== ''
          ? JSON.stringify({
              name: serviceName,
              price: servicePrice,

              time: servicetTime,

              maximumQueue: count,
              employeeId: route.params.importid ? route.params.importid : '',
            })
          : addnewService !== ''
          ? JSON.stringify({
              name: serviceName,

              time: servicetTime,
              description: addnewService,

              maximumQueue: count,
              employeeId: route.params.importid ? route.params.importid : '',
            })
          : JSON.stringify({
              name: serviceName,

              time: servicetTime,

              maximumQueue: count,
              employeeId: route.params.importid ? route.params.importid : '',
            }),
    };

    fetch(CREATE_SERVICE, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, ';;;;');
      });
    navigation.navigate('showService');
  };

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const editItem = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');

    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body:
        servicetTime !== '' && serviceName !== ''
          ? JSON.stringify({
              name: serviceName,

              time: servicetTime,
              price: servicePrice,
              maximumQueue: count,
              employeeId: route.params.importid,
              id: route.params.item._id,
            })
          :  
             JSON.stringify({
                name: serviceName,
                description: addnewService,
                time: servicetTime,
                price: servicePrice,
                maximumQueue: count,
                employeeId: route.params.importid,
                id: route.params.item._id,
              })
            
    };

    fetch(UPDATE_SERVICES, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, ';;;;');
        navigation.navigate('showService');
      });
  };
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <View style={styles.container}>
      <StatusBar
        animated={false}
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />

      <View style={styles.myAppointmentsHeader}>
        <View style={{marginTop: '17%', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: RFValue(18),
              color: '#FFFFFF',
              fontFamily: 'IBMPlexSansHebrew-Bold',
              fontFamily: 'IBMPlexSansHebrew-Bold',
            }}>
            הוספת שירות חדש ליומן
          </Text>
        </View>
      </View>
      <KeyboardAwareScrollView style={{zIndex: 10}}>
        <View
          style={{
            marginTop: '20%',
            flexDirection: 'row',
            marginHorizontal: '13%',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: scale(46),
              height: verticalScale(46),
              borderRadius: moderateScale(46 / 2),
            }}
            source={
              route.params.profile !== ''
                ? {
                    uri: `http://18.159.82.242/v1/uploads/${route.params.profile}`,
                  }
                : require('../../assets/icons/profile/profile.png')
            }
            //  source={require('../../assets/icons/profile/profile.png')}

            // source={{uri:`http://18.159.82.242/v1/uploads/${route.params.profile}`}}
            //  source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
          />
          <Text
            style={{
              marginLeft: '5%',
              fontSize: RFValue(18),
              fontFamily: 'IBMPlexSansHebrew-Bold',
              color: '#5E6167',
            }}>
            {route.params.emplName}
          </Text>
        </View>
        <View style={styles.cover} />
        <Input
          style={{
            textAlign: 'right',
            fontSize: RFValue(16),
            fontFamily: 'IBMPlexSansHebrew-Regular',
            color: '#5E6167',
            marginHorizontal: '3%',
          }}
          maxLength={10}
          value={serviceName}
          onChangeText={text => setserviceName(text)}
          //  keyboardType="number-pad"
          placeholder="שם השירות*"
          placeholderTextColor={'#5E6167'}
        />
        <View style={styles.cover} />
        <Input
          style={{
            textAlign: 'right',
            fontSize: RFValue(16),
            fontFamily: 'IBMPlexSansHebrew-Regular',
            color: '#5E6167',
            marginHorizontal: '3%',
          }}
          value={servicetTime}
          onChangeText={text => setservicetTime(text)}
          maxLength={10}
          keyboardType="number-pad"
          placeholder="זמן בדקות*"
          placeholderTextColor={'#5E6167'}
        />
        <View style={styles.cover} />
        <Input
          style={{
            textAlign: 'right',
            fontSize: RFValue(16),
            fontFamily: 'IBMPlexSansHebrew-Regular',
            color: '#5E6167',
            marginHorizontal: '3%',
          }}
          maxLength={10}
          keyboardType="number-pad"
          placeholder="מחיר (אופציונאלי)"
          placeholderTextColor={'#5E6167'}
          value={servicePrice}
          onChangeText={text => setservicePrice(text)}
        />
        <View style={styles.cover} />
        <Input
          value={addnewService}
          onChangeText={text => setaddnewService(text)}
          style={{
            textAlign: 'right',
            fontSize: RFValue(16),
            fontFamily: 'IBMPlexSansHebrew-Regular',
            color: '#5E6167',
            marginHorizontal: '3%',
          }}
          // maxLength={10}

          //  keyboardType="number-pad"
          placeholder="תיאור (אופציונאלי)"
          placeholderTextColor={'#5E6167'}
        />

        <View style={styles.cover} />
        {route.params && route.params.switchh === true && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '15%',
            }}>
            <Text
              style={{
                fontFamily: 'IBMPlexSansHebrew-Light',
                fontSize: RFValue(15),
                color: '#20304F',
              }}>
              מקסימום הרשמות לתור:
            </Text>
            <View
              style={{
                width: scale(100),
                height: verticalScale(46),
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                marginLeft: '8%',
                borderColor: '#C7CEDE',
                borderWidth: 1,
                borderRadius: moderateScale(6),
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity onPress={handleIncrement}>
                <AddCircle />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    fontFamily: 'IBMPlexSansHebrew-Regular',
                    color: '#5E6167',
                    fontSize: RFValue(16),
                  }}>
                  {count}
                </Text>
              </View>
              <TouchableOpacity disabled={count == 0} onPress={handleDecrement}>
                <RemoveCircle />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.cover} />
        {route.params.item ? (
          <Button
            onPress={editItem}
            textstyle={{color: '#20304F'}}
            style={{backgroundColor: '#C7CEDE'}}
            text="Edit"
          />
        ) : (
          <Button
            onPress={isValidData1}
            textstyle={{color: '#20304F'}}
            style={{backgroundColor: '#C7CEDE'}}
            text="הוספת שירות ליומן"
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    height: verticalScale(16),
  },
  myAppointmentsHeader: {
    height: 110,
    width: windowWidth,
    backgroundColor: colors.THEME,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: '15%',
  },
});

//make this component available to the app
export default AddSerivce;
