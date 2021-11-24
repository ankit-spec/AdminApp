import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import Backgroundimage1 from '../../assets/icons/Background1.svg';
import Backgroundimage2 from '../../assets/icons/Background2.svg';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import {colors} from '../../styles/colors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {androidCameraPermission} from '../../../permissions';
import ImagePicker from 'react-native-image-crop-picker';
import HighFive from '../../assets/icons/highfive.svg';
import axios from 'axios';
import {
  moderateScale,
  verticalScale,
  scale,
} from '../../styles/responsiveStyles';
import {useDispatch, useSelector} from 'react-redux';
import {typography} from '../../styles/typography';
import {showError, showSuccess} from '../../utils/helperFunction';

import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import ShareIcon from '../../assets/icons/shareicon.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_REGISTER_DATA, REGISTER_URL} from '../../config/config';
import {emailCheck} from '../../utils/validations';
androidCameraPermission;

const RegistrationScreen = ({navigation}) => {
  const idd = useSelector(state => state.auth.id);
  console.log(idd, 'iiddd');
  const [name, setfullName] = useState('');
  const [dateOfBirth, setdob] = useState('');
  const [email, setemail] = useState('');
  const [showFirstView, setShoeFirstView] = useState(true);
  const [showSecondView, setshowSecondView] = useState(false);
  const [showThirdView, setshowThirdView] = useState(false);
  const [showFourthView, setShowfourthView] = useState(false);
  const [bussinessName, setBussinessName] = useState('');
  const [bussinessPhone, setBussinessPhone] = useState('');
  const [bussinessAddress, setBussinessAddress] = useState('');
  const [image, setImage] = useState('');
  const firstViewHandler = () => {
    setShoeFirstView(true);
    setshowSecondView(false);
    setshowThirdView(false);
    setShowfourthView(false);
  };

  const dispatch = useDispatch();
 

  const secondViewHandler = () => {
    setShoeFirstView(false);
    setshowSecondView(true);
    setshowThirdView(false);
  };

  const thirdViewHandler = () => {
    setShoeFirstView(false);
    setshowSecondView(false);
    setshowThirdView(true);
  };

  const input = dateOfBirth;
  const [year, month, day] = input.split('-');
  // console.log(`${day}/${month}/${year}`);
  let datereversed = `${day}/${month}/${year}`;

  const isValidData1 = async () => {
    if (name == '') {
      showError('Please enter your Full name');
      return;
    }
    if (dateOfBirth == '') {
      showError('Please enter your date of birth');
      return;
    }
    if (email == '') {
      showError('Please enter your email');
      return;
    }
    if (!emailCheck(email)) {
      if (!/^[0][1-9]$|^[1-9]\d{8,14}$/.test(email)) {
        showError('Please enter valid email');
        return;
      }
    }

    setShoeFirstView(false);
    setshowSecondView(true);
    setshowThirdView(false);
    setShowfourthView(false);
  };

  const isValidData2 = () => {
    if (bussinessName == '') {
      showError('Please enter Bussiness Name');
      return;
    }
    if (bussinessPhone == '') {
      showError('Please enter bussiness phone');
      return;
    }
    if (bussinessAddress == '') {
      showError('Please enter bussiness address');
      return;
    }

    setShoeFirstView(false);
    setshowSecondView(false);
    setshowThirdView(true);
    setShowfourthView(false);
  };

  const isValidData3 = () => {
    // if (image == '') {
    //   showError('Please enter Bussiness Name');
    //   return;
    // }

    setShoeFirstView(false);
    setshowSecondView(false);
    setshowThirdView(false);
    setShowfourthView(true);
  };
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Camera', onPress: takePhotoFromCamera},
        {text: 'Gallery', onPress: onGallery},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      // console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  };
  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      //  console.log('selected Image', image);
      setImage(image.path);
      // imageUpload(image.data);
    });
  };

  const imageUpload = async data => {
    // console.log(data, 'dats');

    const value = await AsyncStorage.getItem('@storage_Key');
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body: JSON.stringify({
        name: name,
        dateOfBirth: datereversed,
        email: email,
        business_name: bussinessName,
        business_phone: bussinessPhone,
        address: bussinessAddress,
        id: idd,
      }),
      logo: `data:image/png;base64${data}`,
    };

    fetch(REGISTER_URL, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
      //  console.log(responseJson, ';;;;');
      });
      navigation.navigate('BussinessId')

    // setShoeFirstView(false);
    // setshowSecondView(false);
    // setshowThirdView(false);
    // setShowfourthView(true);
  };

 

  return (
    <SafeAreaView style={styles.container}>
      <Backgroundimage1 style={styles.image} />
      <Backgroundimage2 style={styles.image1} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        //   style={{ backgroundColor: 'white', flex: 1, padding: 24 }}
      >
        {showThirdView === true ||
        showFirstView === true ||
        showSecondView === true ? (
          <View style={styles.logo}>
            <TouchableOpacity
              onPress={thirdViewHandler}
              style={{
                height: verticalScale(35),
                width: scale(30),
                borderRadius: moderateScale(30 / 2),
                backgroundColor: showThirdView === true ? '#C6CEDE' : '#E9EAEE',

                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#20304F',
                borderWidth: showThirdView === true ? 1 : 0,
                //  opacity: showThirdView === true ? 1 : 0.3,
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Bold',
                  color: '#20304F',
                  textAlign: 'center',
                }}>
                3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={secondViewHandler}
              style={{
                height: verticalScale(35),
                width: scale(30),
                borderRadius: moderateScale(30 / 2),
                backgroundColor:
                  showSecondView === true || showThirdView === true
                    ? '#C6CEDE'
                    : '#E9EAEE',
                marginLeft: 20,
                borderWidth: showSecondView === true ? 1 : 0,
                borderColor: '#20304F',
                alignItems: 'center',
                justifyContent: 'center',
                // opacity: showSecondView === true ? 1 : 0.3,
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Bold',
                  color: '#20304F',
                  textAlign: 'center',
                }}>
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={firstViewHandler}
              style={{
                height: verticalScale(35),
                width: scale(30),
                borderRadius: moderateScale(30 / 2),
                backgroundColor: '#C7CEDE',
                marginLeft: 20,
                borderWidth: showFirstView === true ? 1 : 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Bold',
                  color: '#20304F',
                  textAlign: 'center',
                }}>
                1
              </Text>
            </TouchableOpacity>
            {/* <Text style={styles.logotext}>Logo here</Text> */}
          </View>
        ) : null}
        {showFirstView == true && (
          <View>
            <View style={styles.heading}>
              <Text style={styles.headingText}>הרשמה ליומן בית העסק</Text>
            </View>
            <View style={styles.subheading}>
              <Text style={styles.subheadingtext}>
                לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק
              </Text>
            </View>
            <View style={styles.cover} />
            <Input
              style={{
                textAlign: 'right',
                fontSize: RFValue(16),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                color: '#5E6167',
                marginHorizontal: '5%',
              }}
              maxLength={10}
              value={name}
              onChangeText={text => setfullName(text)}
              keyboardType="default"
              placeholder="שם מלא*"
              placeholderTextColor={'#5E6167'}
            />
            <View style={styles.cover1} />

            <DatePicker
              style={styles.date}
              date={dateOfBirth}
              placeholder="תאריך לידה*"
              mode="date"
              customStyles={{
                placeholderText: {
                  fontSize: moderateScale(16),
                  color: '#5E6167',
                  fontFamily: 'IBMPlexSansHebrew-Regular',
                  // fontSize: RFValue(16),
                },
                dateInput: {
                  borderWidth: 0,

                  paddingHorizontal: '5%',
                  alignItems: 'flex-start',
                },
                dateTouchBody: {
                  justifyContent: 'center',
                  borderRadius: 4,
                  height: verticalScale(52),

                  paddingHorizontal: '2%',

                  fontSize: 16,
                  fontFamily: 'IBMPlexSansHebrew-Regular',
                },
                dateText: {
                  fontSize: 16,
                  fontFamily: 'IBMPlexSansHebrew-Regular',
                },
              }}
              format="DD-MM-YYYY"
              // maxDate={moment().add(4, 'years')}
              maxDate={moment().format('01-10-2010')}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={dateOfBirth => setdob(dateOfBirth)}
            />

            <View style={styles.cover1} />

            <Input
              style={{
                textAlign: 'right',
                fontSize: RFValue(16),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                color: '#5E6167',
                marginHorizontal: '5%',
              }}
              // maxLength={10}
              value={email}
              onChangeText={text => setemail(text)}
              //keyboardType="number-pad"
              placeholder="מספר העסק*"
              placeholderTextColor={'#5E6167'}
            />
            <View style={styles.cover1} />
            <Button onPress={isValidData1} text="המשך לפרטי העסק" />
          </View>
        )}

        {showSecondView == true && (
          <View>
            <View style={styles.heading}>
              <Text style={styles.headingText}>רק עוד כמה פרטים…</Text>
            </View>
            <View style={styles.subheading}>
              <Text style={styles.subheadingtext}>
                לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק
              </Text>
            </View>
            <View style={styles.cover} />
            <Input
              style={{
                textAlign: 'right',
                fontSize: RFValue(16),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                color: '#5E6167',
                marginHorizontal: '5%',
              }}
              maxLength={10}
              value={bussinessName}
              onChangeText={text => setBussinessName(text)}
              keyboardType="default"
              placeholder="שם העסק*"
              placeholderTextColor={'#5E6167'}
            />
            <View style={styles.cover1} />

            <Input
              style={{
                textAlign: 'right',
                fontSize: RFValue(16),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                color: '#5E6167',
                marginHorizontal: '3%',
              }}
              maxLength={10}
              value={bussinessPhone}
              onChangeText={text => setBussinessPhone(text)}
              keyboardType="number-pad"
              placeholder="מספר העסק*"
              placeholderTextColor={'#5E6167'}
            />
            <View style={styles.cover1} />

            <GooglePlacesAutocomplete
              value={bussinessAddress}
              listViewDisplayed="false"
              fontFamily="IBMPlexSansHebrew-Regular"
              placeholder="כתובת*"
              placeholderTextColor="#5E6167"
              //  onPress={onPressAddress}
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                // setBussinessAddress()
                //  console.log(data.description);
                setBussinessAddress(data.description);
              }}
              query={{
                key: 'AIzaSyDAoXX_NnO7iVp7ENOGX-plaQOa5-1AUfs',
                language: 'he',
              }}
              styles={{
                textInputContainer: styles.containerStyle,
                textInput: styles.textInputStyle,
              }}
              autoFocus={true}
              listViewDisplayed="auto"
              returnKeyType={'search'}
              renderRow={rowData => {
                const title = rowData.structured_formatting.main_text;
                const address = rowData.structured_formatting.secondary_text;
                return (
                  <View>
                    <Text style={{fontSize: 14}}>{title}</Text>
                    <Text style={{fontSize: 14}}>{address}</Text>
                  </View>
                );
              }}
              debounce={200}
              nearbyPlacesAPI="GooglePlacesSearch"
              textInputProps={{
                placeholderTextColor: '#5E6167',
                textAlign: 'right',
              }}
            />

            <View style={styles.cover1} />
            <Button onPress={isValidData2} text="המשך להגדרת העיצוב" />
          </View>
        )}

        {showThirdView && (
          <View>
            <View style={styles.heading}>
              <Text style={styles.headingText}>הגדרות תצוגת העסק</Text>
            </View>
            <View style={styles.subheading}>
              <Text style={styles.subheadingtext}>
                לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית סחטיר בלובק
              </Text>
            </View>
            <View style={styles.cover} />
            <TouchableOpacity
              onPress={onSelectImage}
              style={{
                marginHorizontal: '14%',
                backgroundColor: 'white',
                height: verticalScale(150),
                borderRadius: moderateScale(6),
                borderWidth: 1,
                borderColor: '#C7CEDE',
              }}>
              {image === '' ? (
                <View>
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
                      העלאת לוגו
                    </Text>
                  </View>
                  <View style={{marginTop: '5%', marginHorizontal: '4%'}}>
                    <Text
                      style={{
                        color: '#5E6167',
                        opacity: 0.6,
                        textAlign: 'center',
                        fontSize: RFValue(12),
                      }}>
                      בחרו את הלוגו של העסק מתוך הגלרייה והעלו לאפליקציה
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: '3%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#C7CEDE',
                      height: verticalScale(34),
                      marginHorizontal: '30%',
                      borderRadius: moderateScale(6),
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(14),
                        fontFamily: 'IBMPlexSansHebrew-Bold',
                        color: '#20304F',
                        textAlign: 'center',
                      }}>
                      בחירת לוגו
                    </Text>
                  </View>
                </View>
              ) : (
                <Image
                  style={{height: verticalScale(153), width: scale(275)}}
                  source={{
                    uri: image,
                  }}
                />
              )}
            </TouchableOpacity>
            <View style={{height: verticalScale(20)}} />
            <View
              style={{
                marginHorizontal: '14%',
                backgroundColor: 'white',
                height: verticalScale(150),
                borderRadius: moderateScale(6),
                borderWidth: 1,
                borderColor: '#C7CEDE',
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
                  תמונת COVER
                </Text>
              </View>
              <View style={{marginTop: '5%', marginHorizontal: '4%'}}>
                <Text
                  style={{
                    color: '#5E6167',
                    opacity: 0.6,
                    textAlign: 'center',
                    fontSize: RFValue(12),
                  }}>
                  בחרו תמונה רוחבית שתופיע בכניסה לעסק שלכם באפליקצייה
                </Text>
              </View>
              <View
                style={{
                  marginTop: '4%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#C7CEDE',
                  height: verticalScale(34),
                  marginHorizontal: '25%',
                  borderRadius: moderateScale(6),
                }}>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    fontFamily: 'IBMPlexSansHebrew-Bold',
                    color: '#20304F',
                    textAlign: 'center',
                  }}>
                  בחירת תמונה
                </Text>
              </View>
            </View>
            <View style={{height: verticalScale(20)}} />
            <View
              style={{
                marginHorizontal: '14%',
                backgroundColor: 'white',
                height: verticalScale(150),
                borderRadius: moderateScale(6),
                borderWidth: 1,
                borderColor: '#C7CEDE',
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
                  צבע
                </Text>
              </View>
              <View style={{marginTop: '5%', marginHorizontal: '4%'}}>
                <Text
                  style={{
                    color: '#5E6167',
                    opacity: 0.6,
                    textAlign: 'center',
                    fontSize: RFValue(12),
                  }}>
                  בחרו את צבע המותג שלכם
                </Text>
              </View>
              <View
                style={{
                  marginTop: '6%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#CB7E58',
                  height: verticalScale(40),
                  marginHorizontal: '42%',
                  borderRadius: moderateScale(6),
                }}></View>
            </View>
            <View style={styles.cover1} />

            <Button onPress={imageUpload} text="סיום ההרשמה" />
          </View>
        )}
        {showFourthView === true && (
          <View>
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
                }}>
                סיימנו!
              </Text>
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
                  161909
                </Text>
              </View>
              <View
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
              </View>
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
                שמור את מספר העסק שלך, המספר ישמש את לקוחותיך בעת ההרשמה לקביעת
                תורים אצלך
              </Text>
            </View>
            <View style={{height: verticalScale(100)}} />
            <Button 
            
            />
          </View>
        )}
        <View style={styles.cover1} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(50),
    flexDirection: 'row',
  },
  logotext: {
    fontSize: typography.FONT_SIZE20,
    color: colors.THEME,
    fontFamily: 'IBMPlexSansHebrew-Bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(28),
  },
  headingText: {
    fontSize: typography.FONT_SIZE16,
    color: '#20304F',
    fontFamily: 'IBMPlexSansHebrew-Bold',
  },
  subheading: {
    marginTop: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '12%',
  },
  subheadingtext: {
    color: colors.BLACK,
    fontSize: typography.FONT_SIZE16,
    fontFamily: 'IBMPlexSansHebrew-Regular',
    textAlign: 'center',
  },
  cover: {
    height: verticalScale(32),
  },
  cover1: {
    height: verticalScale(10),
  },
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
  date: {
    height: verticalScale(50),
    width: '73%',
    borderWidth: 1,
    borderColor: colors.THEME,
    borderRadius: moderateScale(6),
    backgroundColor: colors.WHITE,
    marginHorizontal: '13.5%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputview: {
    height: verticalScale(52),
    marginHorizontal: moderateScale(50),
    borderWidth: 1,
    borderColor: colors.THEME,
    borderRadius: moderateScale(6),
    backgroundColor: colors.WHITE,

    justifyContent: 'center',
  },
  containerStyle: {
    backgroundColor: 'white',
    height: verticalScale(52),
    marginHorizontal: moderateScale(50),

    borderRadius: moderateScale(6),
    backgroundColor: colors.WHITE,
    textAlign: 'left',
    justifyContent: 'center',
    color: '#5E6167',
  },
  textInputStyle: {
    color: '#5E6167',
    fontSize: RFValue(16),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.THEME,
    fontSize: RFValue(14),
    fontFamily: 'IBMPlexSansHebrew-Regular',
    color: '#5E6167',
    textAlign: 'left',
  },
  row: {
    height: '100%',
  },
});

export default RegistrationScreen;
