//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  LayoutAnimation,
} from 'react-native';
import HomeHeader from '../../components/Header/HomeHeader';
import * as Animatable from 'react-native-animatable';
import {colors} from '../../styles/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';

import Whiteprofile from '../../assets/icons/Whiteprofile.svg';
import {
  moderateScale,
  verticalScale,
  scale,
} from '../../styles/responsiveStyles';
import CalendarIcon from '../../assets/icons/calendar.svg';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {windowWidth} from '../../utils/measurement';
import ThreeDots from '../../assets/icons/threedots.svg';
import Modal from 'react-native-modal';
import Imag from '../../assets/icons/image.svg';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {androidCameraPermission} from '../../../permissions';
import {UPDATE_BUSSINESS_COVER} from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showError, showSuccess} from '../../utils/helperFunction';
import {SafeAreaView} from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
androidCameraPermission;

const DATA = [
    {
      id: 0,
      color: 'green',
      namee: 'מניקור',
      address: 'ראשון 10/10/21 בשעה 11:30',
      person: 'נועה מאיר',
    },
    {
      id: 1,
      color: 'green',
      namee: 'מניקור',
      address: 'ראשון 10/10/21 בשעה 11:30',
      person: 'נועה מאיר',
    },
    {
      id: 2,
      color: '#20304F',
      namee: 'מניקור',
      address: 'ראשון 10/10/21 בשעה 11:30',
      person: 'נועה מאיר',
    },
    {
      id: 3,
      color: '#00000010',
      namee: 'מניקור',
      address: 'ראשון 10/10/21 בשעה 11:30',
      person: 'נועה מאיר',
    },
    {
      id: 4,
      color: '#00000010',
      namee: 'מניקור',
      address: 'ראשון 10/10/21 בשעה 11:30',
      person: 'נועה מאיר',
    },
  ],
  DATA1 = [
    {
      id: 0,
      number: '934',
      namee: 'רשומים לעסק',
    },
    {
      id: 1,
      number: '316',
      namee: 'תורים החודש',
    },
    {
      id: 1,
      number: '316',
      namee: 'תורים היום',
    },
  ];

const DashboardScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [cover, setcover] = useState('');
  const [cover1, setcover1] = useState('');
  const [date, setdate] = useState(moment().format('YYYY-MM-DD'));
  const [markedDates, setmarkedDates] = useState(null);
  const [currTime, setcurrTime] = useState();
  const [comingDate, setcomingDate] = useState(null);
  const [expand, setexpand] = useState(false);
  const [selectt, setSelectt] = useState(null);
  const idd = useSelector(state => state.auth.id);
  const logoImage = useSelector(state => state.authEmployee.bussinessImage);
  const coverImage = useSelector(state => state.authEmployee.bussinesscover);
  console.log(coverImage,'::::')
  const namee = useSelector(state => state.authEmployee.name);
  const [select, setSelect] = useState(null);

  const toggleExpand = selectItem => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpand(!expand);
    setSelect(selectItem);
    //  this.setState({expanded: !this.state.expanded});
  };
  console.log(coverImage, 'logoImage');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Gallery', onPress: onGallery1},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const onGallery1 = async() => {
    const value = await AsyncStorage.getItem('@storage_Key');
    ImagePicker.openPicker({
      disableCropperColorSetters: true,
      includeBase64: true,
      avoidEmptySpaceAroundImage: true,
      mediaType: 'photo',
      compressImageQuality: 1,
      freeStyleCropEnabled: true,
      cropping: true,
      showCropFrame: false,
    }).then(imageee => {
      setcover(imageee.path);
      setcover1(imageee.data);
     
    

     
      const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', Authorization: value},
        body: JSON.stringify({
          file: `data:image/png;base64,${imageee.data}`,
          id: idd,
        }),
      };
  
      fetch(UPDATE_BUSSINESS_COVER, requestOptions)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson, ';;;;');
          showSuccess('Cover updated successfully!')
        })
        .catch
  
        //  showError('Something went wrong!')
        ();
      // console.log(cover1, '.....');
    });
  };

  const imageUpload = async data => {
    console.log(data, 'dats');

    const value = await AsyncStorage.getItem('@storage_Key');
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body: JSON.stringify({
        file: `data:image/png;base64,${cover1}`,
        id: idd,
      }),
    };

    fetch(UPDATE_BUSSINESS_COVER, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, ';;;;');
      })
      .catch

      //  showError('Something went wrong!')
      ();
  };

  const monthNames = [
    'ינואר',
    ' פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ];

  const modalEvent = () => {
    setModalVisible(true);
  };

  const showModal = () => {
    return (
      <Modal
        backdropColor={'rgba(0,0,0,0.80)'}
        backdropOpacity={1}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={3000}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(true)}
        onBackdropPress={() => setModalVisible(false)}
        style={{
          backgroundColor: 'white',
          marginTop: '70%',
          height: verticalScale(30),
          marginBottom: '100%',
          marginHorizontal: '5%',
          borderRadius: moderateScale(20),
        }}>
        <View style={{flex: 1, height: verticalScale(30)}}>
          <Calendar
            locales={
              ((LocaleConfig.locales['he'] = {
                monthNames: [
                  'ינואר',
                  ' פברואר',
                  'מרץ',
                  'אפריל',
                  'מאי',
                  'יוני',
                  'יולי',
                  'אוגוסט',
                  'ספטמבר',
                  'אוקטובר',
                  'נובמבר',
                  'דצמבר',
                ],
                monthNamesShort: [
                  'ינואר',
                  ' פברואר',
                  'מרץ',
                  'אפריל',
                  'מאי',
                  'יוני',
                  'יולי',
                  'אוגוסט',
                  'gfghfhh',
                  'אוקטובר',
                  'נובמבר',
                  'דצמבר',
                ],
                dayNames: [
                  'יום רשון',
                  'יום שיני',
                  'יום שלישי',
                  'יום רביעי',
                  'יוםחמישי',
                  'יוםששי',
                  'שבת',
                ],
                dayNamesShort: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
              }),
              (LocaleConfig.defaultLocale = 'he'))
            }
            current={date}
            minDate={new Date()}
            onDayPress={
              day => {
                setmarkedDates(day.dateString);
                setTimeout(() => {
                  setModalVisible(false);
                }, 1000);
             
              }
              // this.setState(
              //   {
              //     markedDates: day.dateString,
              //     modalVisible: false,
              //     days: this.state.days.concat(day.dateString),
              //   }, console.log(this.state.days, 'llll'),
            }
            markedDates={{
              [markedDates]: {
                selected: true,
                disableTouchEvent: true,
              },
            }}
            renderArrow={direction => {
              if (direction === 'left') {
                
                 <Icon name="chevron-forward-outline" size={25} />;
                }
              
              if (direction === 'right') {
                return <Icon name="chevron-back-outline" size={25} />;
              }
            }}
            style={[styles.calendar, {height: 300, borderRadius: 20}]}
            theme={{
              backgroundColor: '#ffffff',
              textSectionTitleColor: 'black',
              selectedDayBackgroundColor: '#C7CEDE',
              selectedDayTextColor: 'black',
              dayTextColor: 'red',
              arrowColor: '#C7CEDE',
              monthTextColor: '#C7CEDE',
              //  textDayFontFamily: 'IBMPlexSansHebrew-Regular',
              //  textDayStyle: {color: '#5E6167', opacity: 1},
              // textDayFontSize: RFValue(14),
              textMonthFontFamily: 'IBMPlexSansHebrew-Bold',
              todayTextColor: '#C7CEDE',
              todayBackgroundColor: '#F5E5DD',
              textDayHeaderFontFamily: 'IBMPlexSansHebrew-Bold',

              textMonthFontSize: RFValue(14),
              dayTextColor: 'black',
              textSectionTitleDisabledColor: '#d9e1e8',
              'stylesheet.calendar.main': {
                dayContainer: {
                  borderColor: '#D1D3D4',
                  margin: 0,
                  padding: 0,
                  height: 20,
                },
              },
              'stylesheet.day.period': {
                base: {
                  overflow: 'hidden',
                  height: 34,
                  alignItems: 'center',
                  width: 38,
                },
              },

              emptyDayContainer: {
                borderColor: '#D1D3D4',
                borderWidth: 1,
                flex: 1,
                padding: 50,
                height: 50,
                marginHorizontal: 20,
                marginTop: 20,
              },
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                },
                month: {
                  marginTop: 30,
                },
              },
            }}
            // renderArrow={direction => (direction.left ? <Dropdownss /> : null)}
            renderHeader={date => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      marginLeft: 5,
                      height: 30,
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: moderateScale(5),
                      backgroundColor: '#F5E5DD',
                    }}>
                    <Text
                      style={{
                        color: '#CB7E58',
                        fontSize: RFValue(14),
                        fontFamily: 'IBMPlexSansHebrew-Bold',
                      }}>
                      {monthNames[date.getMonth()]}
                    </Text>
                  </View>
                  <View style={{marginLeft: 20}}>
                    <Text
                      style={{
                        color: '#5E6167',
                        fontSize: RFValue(14),
                        // fontFamily: 'IBMPlexSansHebrew-Regular',
                      }}>
                      {' '}
                      {date.getFullYear()}
                    </Text>
                  </View>
                </View>
              );
            }}
            disabledDaysIndexes={[6, 5]}
          />
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={{flex:2}}>
      <StatusBar
        animated={false}
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />
      <KeyboardAwareScrollView>
     
       
        <Animatable.View animation="fadeInDownBig">
          <ImageBackground
            resizeMode="cover"
            imageStyle={{
              borderBottomLeftRadius: moderateScale(20),
              borderBottomRightRadius: moderateScale(20),
            }}
            style={{marginTop: '10%', width: '100%'}}
            source={
              cover === ''
                ? {uri: `http://18.159.82.242/v1/uploads/${coverImage}`}
                : {uri: cover}
            }>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                marginHorizontal: '5%',
              }}>
              <View
                style={{
                  marginTop: '50%',
                  backgroundColor: 'white',

                  height: verticalScale(36),

                  borderRadius: moderateScale(23),
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '5%',
                }}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        height:
                          Platform.OS === 'android'
                            ? verticalScale(34)
                            : verticalScale(30),
                        width: scale(32),
                        backgroundColor: colors.THEME,
                        borderRadius: moderateScale(16),
                        marginLeft: '2%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Whiteprofile />
                    </View>
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: RFValue(14),
                          fontFamily: 'IBMPlexSansHebrew-Regular',
                          color: '#5E6167',
                          marginLeft: '4%',
                          textAlign: 'center',
                        }}>
                        שלום {namee}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={onSelectImage}
                style={{
                  height:
                    Platform.OS === 'android'
                      ? verticalScale(42)
                      : verticalScale(36),
                  width: scale(36),
                  borderRadius: moderateScale(36 / 2),
                  backgroundColor: 'white',
                  marginTop: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Imag />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={styles.nextAppointment}>
            <View>
              <Text style={styles.nextAppointmentStyle}>רשימת תורים</Text>
            </View>
            <View
              style={{
                width: scale(81),
                backgroundColor: '#C7CEDE',

                height: verticalScale(36),

                borderRadius: moderateScale(23),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Bold',
                  color: '#20304F',
                  marginLeft: '19%',
                }}>
                היום
              </Text>
              <TouchableOpacity
                onPress={() => modalEvent()}
                style={{marginLeft: '11%'}}>
                <CalendarIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: '4%',
              marginHorizontal: '8%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height:
                  Platform.OS === 'android'
                    ? verticalScale(50)
                    : verticalScale(45),
                width: scale(45),
              }}
              //  source={{uri:`http://18.159.82.242/v1/uploads/${logoImage}`}}
              source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
            />
            <Text
              style={{
                fontSize: RFValue(18),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                marginLeft: '2%',
                color: '#20304F',
              }}>
              לודמילה
            </Text>
            <View
              style={{
                height:
                  Platform.OS === 'android'
                    ? verticalScale(32)
                    : verticalScale(28),
                width: scale(28),
                backgroundColor: '#C7CEDE',
                borderRadius: moderateScale(28 / 2),
                marginLeft: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Regular',
                  color: '#20304F',
                }}>
                9
              </Text>
            </View>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <View style={styles.containerr}>
                  <View
                    style={{flexDirection: 'row', marginTop: '6%', flex: 1}}>
                    <View style={{flex: 0.1}}>
                      <View
                        style={[
                          styles.rightBar,
                          {backgroundColor: item.color},
                        ]}></View>
                    </View>
                    <View style={{flex: 0.85, marginTop: '2%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: RFValue(18),

                            color: '#5E6167',
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                          }}>
                          {item.namee}
                        </Text>
                        <TouchableOpacity
                          onPress={() => toggleExpand(item)}
                          style={{marginLeft: -50}}>
                          <ThreeDots />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          marginRight: '27%',
                          fontSize: RFValue(14),
                          marginTop: '3%',
                          fontFamily: 'IBMPlexSansHebrew-Regular',
                          color: '#A3A4A8',
                        }}>
                        {item.address}
                      </Text>
                      <View
                        style={{
                          marginTop: '5%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{
                              width: scale(36),
                              height:
                                Platform.OS === 'android'
                                  ? verticalScale(42)
                                  : verticalScale(36),
                            }}
                            source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
                          />
                          <Text style={{marginLeft: '5%',fontSize:RFValue(14),  fontFamily: 'IBMPlexSansHebrew-Regular',color:'#5E6167'}}>{item.person}</Text>
                        </View>
                        <View style={{marginLeft: '65%'}}></View>
                      </View>
                    </View>
                  </View>
                  {expand && item === select && (
                    <View
                      style={{
                        marginLeft: '50%',
                        position: 'absolute',
                        width: 100,
                        borderRadius: moderateScale(6),
                        borderWidth: 1,
                        borderColor: '#A3A4A8',
                        top: 20,
                        height: verticalScale(60),
                        flexDirection: 'column',
                        padding: '2%',
                        backgroundColor: 'white',
                      }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          navigation.navigate('AddService', {
                            item,
                            switchh,
                            importid,
                            profile,
                            emplName,
                          });
                        }}>
                        {/* <Icon
                          style={{marginLeft: '5%'}}
                          size={15}
                          color="#5E6167"
                          name="call-outline"
                        /> */}
                        <Text
                          style={{
                            fontFamily: 'IBMPlexSansHebrew-Regular',
                            fontSize: RFValue(14),
                            color: '#5E6167',
                          }}>
                          עריכה
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: '#A3A4A8',
                          marginHorizontal: '4%',
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                        onPress={() => deleteHandler(item._id)}>
                        <Icon
                          style={{marginLeft: '5%'}}
                          size={20}
                          color="#FC5C65"
                          name="close-circle-outline"
                        />
                        <Text
                          style={{
                            fontFamily: 'IBMPlexSansHebrew-Regular',
                            fontSize: RFValue(14),
                            color: '#FC5C65',
                          }}>
                          מחיקת שירות
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            }}
          />
          <View
            style={{
              marginTop: '4%',
              marginHorizontal: '8%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height:
                  Platform.OS === 'android'
                    ? verticalScale(50)
                    : verticalScale(45),
                width: scale(45),
              }}
              source={require('../../assets/icons/ProfileIcon2/ProfileIcon2.2.png')}
            />
            <Text
              style={{
                fontSize: RFValue(18),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                marginLeft: '2%',
                color: '#20304F',
              }}>
              לודמילה
            </Text>
            <View
              style={{
                height:
                  Platform.OS === 'android'
                    ? verticalScale(32)
                    : verticalScale(28),
                width: scale(28),
                backgroundColor: '#C7CEDE',
                borderRadius: moderateScale(28 / 2),
                marginLeft: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Regular',
                  color: '#20304F',
                }}>
                9
              </Text>
            </View>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <View style={styles.containerr}>
                  <View
                    style={{flexDirection: 'row', marginTop: '6%', flex: 1}}>
                    <View style={{flex: 0.1}}>
                      <View
                        style={[
                          styles.rightBar,
                          {backgroundColor: item.color},
                        ]}></View>
                    </View>
                    <View style={{flex: 0.85, marginTop: '2%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: RFValue(18),

                            color: '#5E6167',
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                          }}>
                          {item.namee}
                        </Text>
                        <TouchableOpacity
                          onPress={() => toggleExpand(item)}
                          style={{marginLeft: -50}}>
                          <ThreeDots />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          marginRight: '27%',
                          fontSize: RFValue(14),
                          marginTop: '3%',
                          fontFamily: 'IBMPlexSansHebrew-Regular',
                          color: '#A3A4A8',
                        }}>
                        {item.address}
                      </Text>
                      <View
                        style={{
                          marginTop: '5%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{
                              width: scale(36),
                              height:
                                Platform.OS === 'android'
                                  ? verticalScale(42)
                                  : verticalScale(36),
                            }}
                            source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
                          />
                          <Text style={{marginLeft: '5%',fontSize:RFValue(14),  fontFamily: 'IBMPlexSansHebrew-Regular',color:'#5E6167'}}>{item.person}</Text>
                        </View>
                        <View style={{marginLeft: '65%'}}></View>
                      </View>
                    </View>
                  </View>
                  {expand && item === select && (
                    <View
                      style={{
                        marginLeft: '50%',
                        position: 'absolute',
                        width: 100,
                        borderRadius: moderateScale(6),
                        borderWidth: 1,
                        borderColor: '#A3A4A8',
                        top: 20,
                        height: verticalScale(60),
                        flexDirection: 'column',
                        padding: '2%',
                        backgroundColor: 'white',
                      }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          navigation.navigate('AddService', {
                            item,
                            switchh,
                            importid,
                            profile,
                            emplName,
                          });
                        }}>
                        {/* <Icon
                          style={{marginLeft: '5%'}}
                          size={15}
                          color="#5E6167"
                          name="call-outline"
                        /> */}
                        <Text
                          style={{
                            fontFamily: 'IBMPlexSansHebrew-Regular',
                            fontSize: RFValue(14),
                            color: '#5E6167',
                          }}>
                          עריכה
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: '#A3A4A8',
                          marginHorizontal: '4%',
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                        onPress={() => deleteHandler(item._id)}>
                        <Icon
                          style={{marginLeft: '5%'}}
                          size={20}
                          color="#FC5C65"
                          name="close-circle-outline"
                        />
                        <Text
                          style={{
                            fontFamily: 'IBMPlexSansHebrew-Regular',
                            fontSize: RFValue(14),
                            color: '#FC5C65',
                          }}>
                          מחיקת שירות
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            }}
          />
          <View
            style={{
              marginTop: '4%',
              marginHorizontal: '8%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height:
                  Platform.OS === 'android'
                    ? verticalScale(50)
                    : verticalScale(45),
                width: scale(45),
              }}
              source={require('../../assets/icons/ProfileIcon2/ProfileIcon2.2.png')}
            />
            <Text
              style={{
                fontSize: RFValue(18),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                marginLeft: '2%',
                color: '#20304F',
              }}>
              לודמילה
            </Text>
            <View
              style={{
                height:
                  Platform.OS === 'android'
                    ? verticalScale(32)
                    : verticalScale(28),
                width: scale(28),
                backgroundColor: '#C7CEDE',
                borderRadius: moderateScale(28 / 2),
                marginLeft: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Regular',
                  color: '#20304F',
                }}>
                9
              </Text>
            </View>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <View style={styles.containerr}>
                  <View
                    style={{flexDirection: 'row', marginTop: '6%', flex: 1}}>
                    <View style={{flex: 0.1}}>
                      <View
                        style={[
                          styles.rightBar,
                          {backgroundColor: item.color},
                        ]}></View>
                    </View>
                    <View style={{flex: 0.85, marginTop: '2%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: RFValue(18),

                            color: '#5E6167',
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                          }}>
                          {item.namee}
                        </Text>
                        <TouchableOpacity
                          onPress={() => toggleExpand(item)}
                          style={{marginLeft: -50}}>
                          <ThreeDots />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          marginRight: '27%',
                          fontSize: RFValue(14),
                          marginTop: '3%',
                          fontFamily: 'IBMPlexSansHebrew-Regular',
                          color: '#A3A4A8',
                        }}>
                        {item.address}
                      </Text>
                      <View
                        style={{
                          marginTop: '5%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{
                              width: scale(36),
                              height:
                                Platform.OS === 'android'
                                  ? verticalScale(42)
                                  : verticalScale(36),
                            }}
                            source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
                          />
                          <Text style={{marginLeft: '5%',fontSize:RFValue(14),  fontFamily: 'IBMPlexSansHebrew-Regular',color:'#5E6167'}}>{item.person}</Text>
                        </View>
                        <View style={{marginLeft: '65%'}}></View>
                      </View>
                    </View>
                  </View>
                  {expand && item === select && (
                    <View
                      style={{
                        marginLeft: '50%',
                        position: 'absolute',
                        width: 100,
                        borderRadius: moderateScale(6),
                        borderWidth: 1,
                        borderColor: '#A3A4A8',
                        top: 20,
                        height: verticalScale(60),
                        flexDirection: 'column',
                        padding: '2%',
                        backgroundColor: 'white',
                      }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          navigation.navigate('AddService', {
                            item,
                            switchh,
                            importid,
                            profile,
                            emplName,
                          });
                        }}>
                        {/* <Icon
                          style={{marginLeft: '5%'}}
                          size={15}
                          color="#5E6167"
                          name="call-outline"
                        /> */}
                        <Text
                          style={{
                            fontFamily: 'IBMPlexSansHebrew-Regular',
                            fontSize: RFValue(14),
                            color: '#5E6167',
                          }}>
                          עריכה
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: '#A3A4A8',
                          marginHorizontal: '4%',
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}
                        onPress={() => deleteHandler(item._id)}>
                        <Icon
                          style={{marginLeft: '5%'}}
                          size={20}
                          color="#FC5C65"
                          name="close-circle-outline"
                        />
                        <Text
                          style={{
                            fontFamily: 'IBMPlexSansHebrew-Regular',
                            fontSize: RFValue(14),
                            color: '#FC5C65',
                          }}>
                          מחיקת שירות
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            }}
          />
          <View
            style={{
              height: verticalScale(130),
              backgroundColor: '#20304F',
              borderTopLeftRadius: moderateScale(20),
              borderTopRightRadius: moderateScale(20),
            }}>
            <View
              style={{
                marginTop: '0%',
                marginHorizontal: '12%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <View style={{width: '65%'}}>
                  <Text
                    style={{
                      fontSize: RFValue(24),
                      color: 'white',
                      alignItems: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Bold',
                    }}>
                    934
                  </Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Regular',
                    }}>
                    תורים היום
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: verticalScale(73),
                  backgroundColor: 'grey',
                  width: 1,
                  margin: 15,
                }}></View>
              <View
                style={{
                  height: verticalScale(73),
                  width: 1,
                  margin: 10,
                }}></View>
              <View>
                <View style={{width: '65%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(24),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Bold',
                    }}>
                    934
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Regular',
                    }}>
                    תורים היום
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: verticalScale(73),
                  backgroundColor: 'grey',
                  width: 1,
                  margin: 15,
                }}></View>
              <View
                style={{
                  height: verticalScale(73),
                  width: 1,
                  margin: 10,
                }}></View>
              <View>
                <View style={{width: '60%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(24),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Bold',
                    }}>
                    934
                  </Text>
                </View>
                <TouchableOpacity  style={{width: '60%'}}>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Regular',
                    }}>
                    רשומים לעסק
                  </Text>
                </TouchableOpacity>
              </View>

           
            </View>
          </View>
          {isModalVisible && showModal()}
        </Animatable.View>
        </KeyboardAwareScrollView>
   
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  nextAppointment: {
    marginTop: '8%',
    flexDirection: 'row',
    marginHorizontal: '8%',
    justifyContent: 'space-between',
  },
  nextAppointmentStyle: {
    fontSize: RFValue(24),
    textAlign: 'left',
    color: '#20304F',
    // fontWeight: 'bold',

    fontFamily: 'IBMPlexSansHebrew-Bold',
  },
  containerr: {
    backgroundColor: '#ffffff',
    height: moderateScale(151),
    marginHorizontal: moderateScale(30),
    width: (windowWidth * 85) / 100,
    alignSelf: 'center',
    marginTop: '2%',
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    flex: 1,
  },

  rightBar: {
    width: '20%',
    height: '85%',

    alignSelf: 'center',
    borderRadius: 20,
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
});

//make this component available to the app
export default DashboardScreen;
