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
import {
  moderateScale,
  verticalScale,
  scale,
} from '../../styles/responsiveStyles';
import {useSelector} from 'react-redux';
import {typography} from '../../styles/typography';
import {showError, showSuccess} from '../../utils/helperFunction';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REGISTER_URL} from '../../config/config';
import {emailCheck} from '../../utils/validations';
import AddPostView from '../../components/AddPostView';
import {useDispatch} from 'react-redux';
import * as authAction from '../../redux/actions/auth';
import { KeyboardAwareFlatList,KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

androidCameraPermission;

const RegistrationScreen = ({navigation}) => {
  const idd = useSelector(state => state.auth.id);
  const code=useSelector(state=>state.authEmployee)
  console.log(code,'code')
  // console.log(idd, 'iiddd');
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
  const [instaname, setinstaname] = useState('');
  const [image, setImage] = useState('');
  const [image1, setimage1] = useState('');
  const [cover, setCover] = useState('');
  const [cover1, setcover1] = useState('');
  const [imageList, setImageList] = useState([]);
  const [grpImages, setgrpImages] = useState([]);
  const dispatch = useDispatch();
  const firstViewHandler = () => {
    setShoeFirstView(true);
    setshowSecondView(false);
    setshowThirdView(false);
    setShowfourthView(false);
  };

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


useEffect(() => {
  
  if(code.code=='Success'){
   const loginkey =  AsyncStorage.setItem( 'loginkey',JSON.stringify(true));

    dispatch(authAction.removeData(code))
    navigation.navigate('BussinessId');

  }
}, [code])

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
  const onSelectImage1 = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Gallery', onPress: onGallery1},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const onSelectImage2 = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Gallery', onPress: openImagePicker},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };

  const openImagePicker = () => {
    let imageListt = [];
    let apiList = [];
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      maxFiles: 5,
      includeBase64: true,
      disableCropperColorSetters:true,
      avoidEmptySpaceAroundImage:true,
      mediaType:'photo',
      compressImageQuality:1	,
      freeStyleCropEnabled:true,
      showCropFrame:false,
      compressImageQuality:0.8	
    })
      .then(response => {
        // console.log('Response', response);
        response.map(image => {
          imageListt.push({
            filename: image.filename,
            path: image.path,
            // data: image.data,
          });
        });
        response.map(imagee =>
          apiList.push(`data:image/png;base64,${imagee.data}`),
        );
        setgrpImages(apiList);
        setImageList(imageListt);
      })
      .catch(e => console.log('Error'));
  };
  const onGallery1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      disableCropperColorSetters:true,
      avoidEmptySpaceAroundImage:true,
      mediaType:'photo',
      compressImageQuality:1	,
      freeStyleCropEnabled:true,
      showCropFrame:false,
      compressImageQuality:0.8	

    }).then(imageee => {
      // setCover(imageee.path);
      // setcover1(imageee.data);
      //  console.log(imageee.data, 'data<<<====');
      setCover(imageee.path);
      setcover1(imageee.data);
      console.log(cover1, '.....');
    });
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
      disableCropperColorSetters:true,
      avoidEmptySpaceAroundImage:true,
      mediaType:'photo',
      compressImageQuality:1	,
      freeStyleCropEnabled:true,
      showCropFrame:false,
      compressImageQuality:0.8	

    }).then(imagee => {
      /// console.log(imagee.data,'bvbvb')

      //  console.log('selected Image', image);
      setImage(imagee.path);
      setimage1(imagee.data);
      console.log(image1, 'data<<<====');
      // console.log(image.data,'jbujbub')
      // imageUpload(image.data);
    });
  };

  const imageUpload = (data, data1) => {
  
    try {
      dispatch(authAction.resgisterEmployee(name,datereversed,email,bussinessName,bussinessPhone,bussinessAddress,instaname,idd,image1,cover1,grpImages));
     

  } catch (error) {
      showError('Something went wrong')
    

  }
   

 //  dispatch(authAction.resgisterEmployee(name,datereversed,email,bussinessName,bussinessPhone,bussinessAddress,instaname,idd,image1,cover1,grpImages))
    // if(code==200){
    //   navigation.navigate('BussinessId');

    // }else{
    //   showError('Something went wrong!')
    // }
//     const value = await AsyncStorage.getItem('@storage_Key');
// console.log(value,',jnbjnbj')
//     const requestOptions = {
//       method: 'PUT',
//       headers: {'Content-Type': 'application/json', Authorization: value},
//       body: JSON.stringify({
//         name: name,
//         dateOfBirth: datereversed,
//         email: email,
//         business_name: bussinessName,
//         business_phone: bussinessPhone,
//         address: bussinessAddress,
//         instagramId: instaname,
//         id: idd,
//         logo: `data:image/png;base64,${image1}`,
//         cover: `data:image/png;base64,${cover1} `,
//         multipleImage: grpImages,
//       }),
//     }
    
//     fetch(REGISTER_URL, requestOptions)
//      .then(response => response.json())
//       .then(responseJson => {
//         console.log(responseJson, ';;;;');
//       });
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
                width: scale(35),
                borderRadius: moderateScale(35 / 2),
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
                width: scale(35),
                borderRadius: moderateScale(35/ 2),
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
                width: scale(35),
                borderRadius: moderateScale(35 / 2),
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
          <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          // extraScrollHeight={Platform.OS == "ios" ? "4%" : "0%"}
           extraHeight={Platform.OS == "ios" ? "9%" : 0}
           behavior={Platform.OS == "ios" ? "position" : null}
           resetScrollToCoords={{ x: 0, y: 0 }}
           scrollEnabled={false}
           showsVerticalScrollIndicator={false}
           showsHorizontalScrollIndicator={false}
           keyboardOpeningTime={1}
           enableOnAndroid={true}
           contentContainerStyle={{ flex: 1 }}
          >
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
              maxLength={16}
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
              placeholder="דואר אלקטרוני*"
              placeholderTextColor={'#5E6167'}
            />

            <View style={styles.cover1} />

          
            <View style={styles.cover1} />
            <Button onPress={isValidData1} text="המשך לפרטי העסק" />
          </KeyboardAwareScrollView>
        )}

        {showSecondView == true && (
          <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
         // extraScrollHeight={Platform.OS == "ios" ? "4%" : "0%"}
          extraHeight={Platform.OS == "ios" ? "9%" : 0}
          behavior={Platform.OS == "ios" ? "position" : null}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardOpeningTime={1}
          enableOnAndroid={true}
          contentContainerStyle={{ flex: 1 }}
          >
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
              placeholder=" מספר טלפון של העסק"
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
          </KeyboardAwareScrollView>
        )}

        {showThirdView && (
          <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          // extraScrollHeight={Platform.OS == "ios" ? "4%" : "0%"}
         
          >
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
                <TouchableOpacity
                onPress={onSelectImage}
                >
                <Image
                  style={{height: verticalScale(153), width: scale(275)}}
                  source={{
                    uri: image,
                  }}
                />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <View style={{height: verticalScale(20)}} />
            <TouchableOpacity
              onPress={onSelectImage1}
              style={{
                marginHorizontal: '14%',
                backgroundColor: 'white',
                height: verticalScale(150),
                borderRadius: moderateScale(6),
                borderWidth: 1,
                borderColor: '#C7CEDE',
              }}>
              {cover === '' ? (
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
              ) : (
                <TouchableOpacity
                onPress={onSelectImage1}
                >
                <Image
                  style={{height: verticalScale(153), width: scale(275)}}
                  source={{
                    uri: cover,
                  }}
                />
                </TouchableOpacity>
              )}
              
            </TouchableOpacity>
            <View style={{height: verticalScale(20)}} />
            <AddPostView newImages={imageList} addImages={onSelectImage2} />
            <View style={{height: verticalScale(20)}} />

            <Input
              style={{
                textAlign: 'right',
                fontSize: RFValue(16),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                color: '#5E6167',
                marginHorizontal: '5%',
                alignItems:'center'
              }}
              // maxLength={10}
              value={instaname}
              onChangeText={text => setinstaname(text)}
              //keyboardType="number-pad"
              placeholder="שם משתמש אינסטגרם באנגלית"
              placeholderTextColor={'#5E6167'}
            />
            <View style={styles.cover1} />

            <Button onPress={imageUpload} text="סיום ההרשמה" />
          </KeyboardAwareScrollView>
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
    borderColor: '#C7CEDE',
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
    height: verticalScale(52),

    color: '#5E6167',
    fontSize: RFValue(16),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#C7CEDE',
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
