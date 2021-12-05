import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TouchableNativeFeedback,
  SafeAreaView,
} from 'react-native';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import Add from '../../assets/icons/Add.svg';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../styles/responsiveStyles';
import {CREATE_EMPLOYEE, GET_EMPLOYESS} from '../../config/config';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {androidCameraPermission} from '../../../permissions';
import ImagePicker from 'react-native-image-crop-picker';
import * as authActions from '../../redux/actions/auth';
import {showError} from '../../utils/helperFunction';
import {windowWidth} from '../../utils/measurement';
import {colors} from '../../styles/colors';
import { KeyboardAwareFlatList,KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header2 from '../../components/Header/Header2';

androidCameraPermission;
const DATA = [
  {
    id: 0,
    text: 'לודמילה',
  },
  {
    id: 1,
    text: 'תמי',
  },
  {
    id: 2,
    text: 'יוגב',
  },
];
const ShowEmployees = ({navigation, route}) => {
  const idd = useSelector(state => state.auth.id);

  const [view, setview] = useState(false);
  const [data, setdata] = useState(null);
  const [imagee, setimage] = useState();
  const [image1, setimage1] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [loading, setLoading] = useState(false);
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Gallery', onPress: onGallery},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        getAllNews();
      }, 1000);
      setLoading(false);
      console.log('jhihihnij');
      // }
    } catch (error) {
      console.log('inside error');
      console.log(error);
    }
    const unsubscribeNavigationFocus = navigation.addListener(
      'focus',
      async () => {
        try {
          setLoading(true);
          setTimeout(() => {
            getAllNews();
          }, 1000);
          setLoading(false);
        } catch (error) {
          console.log('inside error');
          console.log(error);
        } finally {
        }
      },
    );

    return unsubscribeNavigationFocus;
  }, [loading, view, navigation]);

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(imageee => {
      // setCover(imageee.path);
      // setcover1(imageee.data);
      //  console.log(imageee.data, 'data<<<====');
      setimage(imageee.path);
      setimage1(imageee.data);
    });
  };

  const showView = () => {
    setview(prevState => !prevState);
  };
  const getAllNews = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');

    fetch(`http://18.159.82.242/v1/business/get_employees/${idd}`, {
      headers: {Authorization: value},
    })
      .then(response => response.json())
      .then(responseJson => {
        setdata(responseJson.data.data);
        //  navigation.navigate('AppTabNavigator')
        console.log(data, 'lllll');
        //   setRegisterData({bussinessdata:responseJson.data.businessId})
        // console.log(respon,'<<<<=====')
      })
      .catch(error => {
        console.log(error);

        showError('Something went wrong!');
      });
  };

  const SaveEmployee = async () => {
    if (name === '') {
      showError('Please enter your Name');
      return;
    }
    if (phone === '') {
      showError('Please enter your phone number');
      return;
    }
    if (phone.length !== 10) {
      showError('Invalid phone number');
      return;
    }
    setLoading(true);
    // dispatch(authActions.addEmployees(name,phone,image1,idd))
    // setLoading(false)

    const value = await AsyncStorage.getItem('@storage_Key');

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body: JSON.stringify({
        name: name,
        phone: phone,
        //  file: `data:image/png;base64,${image1}`,
        createdBy: idd,
      }),
    };

    fetch(CREATE_EMPLOYEE, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, ';;;;');
      })
      .catch(error => {
        console.log(error);

        showError('Something went wrong!');
      });

    setview(false);
    getAllNews();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />

      
    <View style={styles.myAppointmentsHeader}>
        <View style={{marginTop: '5%', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: RFValue(18),
              color: '#FFFFFF',
              fontFamily: 'IBMPlexSansHebrew-Bold',
              fontFamily: 'IBMPlexSansHebrew-Bold',
            }}>
            ניהול יומנים
          </Text>
        </View>
      </View> 

      <TouchableOpacity
        onPress={showView}
        style={{
          height: verticalScale(46),
          width: scale(46),
          borderRadius: moderateScale(40),
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          position:'absolute',
          top: 150,
          zIndex: 9999,
          right: 50,
          overflow:'hidden',
          zIndex:99999
        }}
        // style={{
        //   height: verticalScale(46),
        //   width: scale(40),
        //   borderRadius: moderateScale(40),
        //   backgroundColor: 'white',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   position: 'absolute',
        //   top: 200,
        //   zIndex: 999,
        //   right: 50,
        // }}
      >
        {view === false ? (
          <Add />
        ) : (
          <Icon name="close-outline" size={30} color="black" />
        )}
      </TouchableOpacity>
      <KeyboardAwareScrollView
               style={{zIndex:10}}
      //          keyboardShouldPersistTaps={"handled"}
      //  //   extraScrollHeight={Platform.OS == "ios" ?"4%": "0%"}
      //          extraHeight={Platform.OS == "ios" ? "9%" : '0%'}
      //          style={{ flex: 1, backgroundColor: "white" }}
      //          behavior={Platform.OS == "ios" ? "position" : null}
      //          resetScrollToCoords={{ x: 0, y: 0 }}
      //          scrollEnabled={false}
      //          showsVerticalScrollIndicator={false}
      //          showsHorizontalScrollIndicator={false}
      //          keyboardOpeningTime={1}
      //          enableOnAndroid={true}
      //          contentContainerStyle={{ flex: 1 }}

   >
      
      <View style={{margin: '5%',flex:1}}>
       
          {loading === true ? (
            <ActivityIndicator size="large" />
          ) : (
            <View>
           <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('details', {item});
                    }}
                    style={{padding: '5%',flex:1}}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        height: verticalScale(80),
                        padding: '5%',
                        borderRadius: moderateScale(20),
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
                        <Image
                          style={{
                            width: scale(46),
                            height: verticalScale(46),
                            borderRadius: moderateScale(46 / 2),
                          }}
                          source={
                            item.profile
                              ? {
                                  uri: `http://18.159.82.242/v1/uploads/${item.profile}`,
                                }
                              : require('../../assets/icons/profile/profile.png')
                          }

                          //    source={{uri:`http://18.159.82.242/v1/uploads/${item.profile}`}}
                          //source={require('1638038266337.png')}
                          //   source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
                        />

                        <Text
                          style={{
                            marginLeft: '5%',
                            fontSize: RFValue(18),
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                            color: '#5E6167',
                          }}>
                          {item.name}
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
                );
              }}
            /> 
            </View>
         )} 

          {view === true && (
      
            <Animatable.View duration={800} animation="fadeInUpBig">
           
 
                <View
                  style={{
                    backgroundColor: 'white',
                    height: verticalScale(120),
                    padding: '10%',
                    borderRadius: moderateScale(20),
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        width: scale(46),
                        height: verticalScale(46),
                      }}
                      //source={require('1638038266337.png')}
                      source={require('../../assets/icons/profile/profile.png')}
                    />

                    <View>
                      <TextInput
                        value={name}
                        onChangeText={text => setname(text)}
                        placeholder="שם העובד/ת"
                        style={{
                          height: 40,
                          borderBottomColor: '#5E6167',
                          borderBottomWidth: 1,
                          width: '100%',
                          marginLeft: '10%',
                        }}
                      />
                      <TextInput
                        keyboardType="number-pad"
                        maxLength={10}
                        value={phone}
                        onChangeText={text => setphone(text)}
                        placeholder="מספר טלפון של העובד
                "
                        style={{
                          height: 40,
                          borderBottomColor: '#5E6167',
                          borderBottomWidth: 1,
                          width: '100%',
                          marginLeft: '10%',
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{flex: 1, alignItems: 'center', marginLeft: '90%'}}>
                    <Image
                      style={{marginLeft: '60%', opacity: 0.3}}
                      source={require('../../assets/icons/SideAccordian/SideAccordian.png')}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={SaveEmployee}
                  style={{
                    height: 30,
                    backgroundColor: 'lightgreen',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    width: '50%',
                    marginLeft: '20%',
                    marginTop: '5%',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>שמור עובד</Text>
                </TouchableOpacity>
           
          
            </Animatable.View>
          
          )}
    
      </View>
      
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
 zIndex: 10
  },
  myAppointmentsHeader: {
    height: '10%',
    width: windowWidth,
    backgroundColor: colors.THEME,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: '15%',
  },
});

//make this component available to the app
export default ShowEmployees;
