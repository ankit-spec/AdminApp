//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Backgroundimage1 from '../../../assets/icons/Background1.svg';
import Backgroundimage2 from '../../../assets/icons/Background2.svg';
import Button from '../../../components/Button/Button';
import {
  moderateScale,
  verticalScale,
  scale,
} from '../../../styles/responsiveStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import HighFive from '../../../assets/icons/highfive.svg';
import {RFValue} from 'react-native-responsive-fontsize';
import ShareIcon from '../../../assets/icons/shareicon.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import {GET_REGISTER_DATA} from '../../../config/config';
import { TouchableOpacity } from 'react-native-gesture-handler';
const BussinessIdScreen = ({navigation}) => {
  const [Data, setData] = useState({
    Company: '',
  });
  useEffect(() => {
    getAllNews();
  }, []);

  const getAllNews = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');

    fetch(GET_REGISTER_DATA, {
      headers: {Authorization: value},
    })
      .then(response => response.json())
      .then(responseJson => {
        setData({Company: responseJson.data.businessId});
       
        console.log(Data.Company, 'lllll');
        //   setRegisterData({bussinessdata:responseJson.data.businessId})
        // console.log(respon,'<<<<=====')
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onShareHandler = () => {
    let androidUrl =
      'https://play.google.com/store/apps/details?id=com.whatsapp&hl=en_IN&gl=US';
    let iosUrl = 'https://apps.apple.com/in/app/whatsapp-messenger/id310633997';

    const shareOptions = {
      title: 'Share via',
      message: `Check out this awesome app and enjoy the latest feature and functionality`,
      url: Platform.OS == 'android' ? androidUrl : iosUrl,
    };
    Share.open(shareOptions)
      .then(res => {
        console.log('share response : ', res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Backgroundimage1 style={styles.image} />
      <Backgroundimage2 style={styles.image1} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30%',
          height: verticalScale(128),
          backgroundColor: '#C7CEDE',
          width: scale(128),
          marginLeft: '30%',
          borderRadius: 128 / 2,
        }}>
        <HighFive />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5%',
        }}>
        <Text
          style={{
            fontSize: RFValue(24),
            fontFamily: 'IBMPlexSansHebrew-Bold',
            color: '#20304F',
          }}></Text>
      </View>
      <View
        style={{
          marginHorizontal: '14%',
          backgroundColor: 'white',
          height: verticalScale(162),
          borderRadius: moderateScale(6),
          borderWidth: 1,
          borderColor: '#C7CEDE',
          marginTop: '6%',
        }}>
        <View
          style={{
            marginTop: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              fontFamily: 'IBMPlexSansHebrew-Bold',
              color: '#5E6167',
            }}>
            מספר העסק שלך
          </Text>
        </View>
        <View style={{marginTop: '5%', marginHorizontal: '4%'}}>
          <Text
            style={{
              color: '#20304F',
              opacity: 0.6,
              textAlign: 'center',
              fontSize: RFValue(32),
              fontFamily: 'IBMPlexSansHebrew-Bold',
              opacity: 1,
            }}>
            {Data.Company}
          </Text>
        </View>
        <TouchableOpacity
      onPress={onShareHandler}
          style={{
            marginTop: '4%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#C7CEDE',
            height: verticalScale(34),
            marginHorizontal: '30%',
            borderRadius: moderateScale(6),
            flexDirection: 'row',
          }}>
          <ShareIcon />
          <Text
            style={{
              fontSize: RFValue(14),
              fontFamily: 'IBMPlexSansHebrew-Bold',
              color: '#20304F',
              textAlign: 'center',
              marginLeft: '8%',
            }}>
            שיתוף
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '6%',
          marginHorizontal: '21%',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: RFValue(16),
            fontFamily: 'IBMPlexSansHebrew-Regular',
            color: '#20304F',
          }}>
          שמור את מספר העסק שלך, המספר ישמש את לקוחותיך בעת ההרשמה לקביעת תורים
          אצלך
        </Text>
      </View>
      <View style={{height: verticalScale(100)}} />
      <Button
      onPress={()=>{
        navigation.navigate('AppTabNavigator')
      }}
      text="סיום ההרשמה" />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image1: {
    position: 'absolute',
    top: moderateScale(200),
    left: moderateScale(-180),
  },
  image: {
    position: 'absolute',
    top: moderateScale(330),
    left: moderateScale(-50),
  },
});

//make this component available to the app
export default BussinessIdScreen;
