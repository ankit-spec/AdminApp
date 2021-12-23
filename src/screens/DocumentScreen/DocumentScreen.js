//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import ShareIcon from '../../assets/icons/shareicon.svg';
import {
  verticalScale,
  moderateScale,
  scale,
} from '../../styles/responsiveStyles';
import {RFValue} from 'react-native-responsive-fontsize';
import Location from '../../assets/icons/location-sharp.svg';
import InstaLogo from '../../assets/icons/logo-instagram.svg';
import WatsappLogo from '../../assets/icons/logo-whatsapp.svg';
import PhoneCall from '../../assets/icons/PhoneCall.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import { KeyboardAwareFlatList,KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Share from 'react-native-share';

import { GET_REGISTER_DATA } from '../../config/config';
const DocumentScreen = ({navigation}) => {
  const bName = useSelector(state => state.authEmployee.bussinessname);
  const bAddress = useSelector(state => state.authEmployee.bussissAddress);
  const bPhone = useSelector(state => state.authEmployee.phone);
  const bInsta = useSelector(state => state.authEmployee.insta);
  const bemail = useSelector(state => state.authEmployee.email);
  const [busssinessName, setbusssinessName] = useState(bName ? bName : '');
  const [address, setaddress] = useState(bAddress ? bAddress : '');
  const [phonenumber, setphonenumber] = useState(bPhone ? bPhone : '');
  const [bioo, setbioo] = useState('');
  const [insta, setinsta] = useState(bInsta ? bInsta : '');
  const [bio, setbio] = useState('');
  const [email, setemail] = useState(bemail ? bemail : '');

  const [Data, setData] = useState({
    Company: '',
  });
  console.log(bPhone, bAddress, bName, bInsta, 'ppppp');

  useEffect(()=>{
    getAllNews()
  },[])


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
    await AsyncStorage.setItem('@bussinessId', Data.Company);
  };


  return (
    <SafeAreaView style={{flex: 1}}>
 <KeyboardAwareScrollView> 

      <ScrollView>
        <View
          style={{
            height: verticalScale(170),
            backgroundColor: 'white',
            borderBottomLeftRadius: moderateScale(25),
            borderBottomRightRadius: moderateScale(25),
          }}>
          <View style={{marginTop: '17%', marginHorizontal: '10%'}}>
            <Text
              style={{
                color: '#5E6167',
                fontSize: RFValue(16),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                textAlign:'left'
              }}>
              מספר העסק שלך
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '2%',
              marginHorizontal: '10%',
            }}>
            <Text
              style={{
                color: '#20304F',
                fontSize: RFValue(32),
                fontFamily: 'IBMPlexSansHebrew-Bold',
              }}>
              {Data.Company}
            </Text>
            <TouchableOpacity
             onPress={onShareHandler}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#C7CEDE',
                height: verticalScale(34),
                width: scale(104),
                borderRadius: moderateScale(6),
                flexDirection: 'row',
                marginTop:'2%'
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
        </View>
        <TextInput
          style={{
            marginTop: Platform.OS === 'android' ? '0%' : '5%',
            height: 50,
            marginHorizontal: '10%',
            borderBottomWidth: 1,
            alignItems: 'center',
            textAlign: 'center',
            fontSize: RFValue(24),
            fontFamily: 'IBMPlexSansHebrew-Regular',
            borderBottomColor: '#C7CEDE',
            justifyContent:'center'
          }}
          value={busssinessName}
          onChangeText={text => setbusssinessName(text)}
        />

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '2%',
            opacity: 0.6,
            color: '#20304F',
          }}>
          <Text
            style={{
              fontSize: RFValue(14),
              fontFamily: 'IBMPlexSansHebrew-Bold',
            }}>
            שם העובד/ת
          </Text>
        </TouchableOpacity>
        <View style={{height: verticalScale(30)}} />
       

        <View
          style={{
            height: verticalScale(52),
            backgroundColor: 'white',
            flexDirection: 'row',
            borderColor: '#C7CEDE',
            borderWidth: 0.5,
            marginHorizontal: '10%',
            borderRadius: moderateScale(6),
            alignItems:'center'
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '5%',
              
            }}>
            <Location />
          </View>
          <TextInput
              style={{justifyContent: 'center', alignItems: 'center',marginLeft:10,width:'80%',textAlign:'right'}}
          value={address} onChangeText={text => setaddress(text)} />
        </View>
        <View style={{height: verticalScale(15)}} />

        <View
          style={{
            height: verticalScale(52),
            backgroundColor: 'white',
            flexDirection: 'row',
            borderColor: '#C7CEDE',
            borderWidth: 0.5,
            marginHorizontal: '10%',
            borderRadius: moderateScale(6),
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              marginLeft: '5%',
            }}>
            <PhoneCall />

            {/* <Icon
   name='logo-instagram'
   size={18}
   /> */}
          </View>
          <TextInput
             style={{justifyContent: 'center', alignItems: 'center',marginLeft:10,width:'80%',textAlign:'right'}}
            value={phonenumber}
            onChangeText={text => setphonenumber(text)}
        nnpo
          />
        </View>

        <View style={{height: verticalScale(15)}} />

        <View
          style={{
            height: verticalScale(52),
            backgroundColor: 'white',
            flexDirection: 'row',
            borderColor: '#C7CEDE',
            borderWidth: 0.5,
            marginHorizontal: '10%',
            borderRadius: moderateScale(6),
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              marginLeft: '5%',
            }}>
       
            <WatsappLogo />
          </View>
          <TextInput
            style={{justifyContent: 'center', alignItems: 'center',marginLeft:10,width:'80%',textAlign:'right'}}
            value={setbioo}
            onChangeText={text => setbioo(text)}
          />
        </View>
        <View style={{height: verticalScale(15)}} />
     
      
        <View
          style={{
            height: verticalScale(52),
            backgroundColor: 'white',
            flexDirection: 'row',
            borderColor: '#C7CEDE',
            borderWidth: 0.5,
            marginHorizontal: '10%',
            borderRadius: moderateScale(6),
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              marginLeft: '5%',
            }}>
            <Icon name="logo-instagram" size={18} />
          </View>
          <TextInput
            style={{justifyContent: 'center', alignItems: 'center',marginLeft:10,width:'80%',textAlign:'right'}}
            value={insta}
            onChangeText={text => setinsta(text)}
            //style={{backgroundColor: 'white', height: 42}}
          />
        </View>
        <View
          style={{
            marginTop: '10%',
            height: verticalScale(1),
            backgroundColor: '#C7CEDE',
            marginHorizontal: '10%',
          }}
        />
        <View style={{marginTop: '10%', marginHorizontal: '10%'}}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: RFValue(16),
              fontFamily: 'IBMPlexSansHebrew-Bold',
              color: '#20304F',
            }}>
            Bio / הודעה ראשית
          </Text>
        </View>
        <View style={{marginTop: '2%', marginHorizontal: '10%'}}>
          <Text
            style={{
              fontSize: RFValue(16),
              fontFamily: 'IBMPlexSansHebrew-Light',
              color: '#20304F ',
              textAlign:'left'
            }}>
            {' '}
            הצגת הודעה או מידע על העסק בדף הראשי
          </Text>
        </View>
        <View style={{height: verticalScale(15)}} />

        <TextInput
         multiline
          value={bio}
          onChangeText={text => setbio(text)}
          style={{
            backgroundColor: 'white',
            height: verticalScale(120),
            marginHorizontal: '10%',
            borderWidth: 0.5,
            borderColor: '#C7CEDE',
            textAlign:'right',
          padding: '5%',
paddingTop:'5%'
          }}
        />
        <View
          style={{
            marginTop: '10%',
            height: verticalScale(1),
            backgroundColor: '#C7CEDE',
            marginHorizontal: '10%',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Document1', {
              busssinessName,
              address,
              phonenumber,
              bioo,
              insta,
              bio,
              email,
            });
          }}
          style={{
            marginHorizontal: '10%',
            marginTop: '10%',
            marginBottom: '10%',
          }}>
          <View
            style={{
              backgroundColor: '#C7CEDE',
              height: verticalScale(56),
              padding: '2%',
              borderRadius: moderateScale(10),
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
            }}>
            <View
              style={{
                flex: 0.8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginLeft: '5%',
                  fontSize: RFValue(16),
                  fontFamily: 'IBMPlexSansHebrew-Bold',
                  color: '#20304F',
                }}>
                שינוי לוגו וצבעים
              </Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <Image
                style={{marginLeft: '60%'}}
                source={require('../../assets/icons/SideAccordian/SideAccordian.png')}
              />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default DocumentScreen;
