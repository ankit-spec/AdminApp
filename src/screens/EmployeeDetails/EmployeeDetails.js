//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Switch,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../styles/responsiveStyles';
import {RFValue} from 'react-native-responsive-fontsize';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../../../permissions';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../../redux/actions/auth';
import {UPDATE_EMPLOYEE} from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {windowWidth} from '../../utils/measurement';
import {colors} from '../../styles/colors';
androidCameraPermission;
// create a component
const DATA = [
  {
    id: 0,
    text: 'הגדרת שירותים ליומן',
  },
  {
    id: 1,
    text: 'ימים ושעות קבלה',
  },
  {
    id: 2,
    text: 'מספר טלפון',
  },
  {
    id: 3,
    text: 'מחיקת עובד',
  },
];
const EmployeeDetails = ({navigation, route}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [employeeName, setEmployeeName] = useState(route.params.item.name);
  const [image, setimage] = useState(
    route.params.item.profile ? route.params.item.profile : '',
  );
  const empId = route.params.item.id;
  console.log(empId, 'empId');
  const [image1, setimage1] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const toggleSwitch = () => setIsEnabled(prevState => !prevState);
  const idimport = route.params.item.id;
  const [importImage, setimportImage] = useState('')
  useEffect(() => {
    console.log(idimport, 'id');
    console.log(route.params.item.profile, 'phone');
  }, []);
  const dispatch = useDispatch();
  const idd = useSelector(state => state.auth.id);
  console.log(idd, 'idd');
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Gallery', onPress: onGallery1},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  

  const onGallery1 = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      disableCropperColorSetters: true,
      avoidEmptySpaceAroundImage: true,
      mediaType: 'photo',
      compressImageQuality: 1,
      freeStyleCropEnabled: true,
      showCropFrame: false,
    }).then(async imageee => {
      // setCover(imageee.path);
      // setcover1(imageee.data);
      //  console.log(imageee.data, 'data<<<====');
      setimage(imageee.path);
      setimage1(imageee.data);
      // save()
      console.log(image1, 'lllll');
      console.log(phone, 'phone');
      setName(route.params.item.name), setPhone(route.params.item.phone);
      // dispatch(authActions.addEmployees(name,phone,image1,idimport))
      const value = await AsyncStorage.getItem('@storage_Key');
      console.log(value, 'value');
      const response = await fetch(UPDATE_EMPLOYEE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: value,
        },
        body: JSON.stringify({
          name: employeeName,
          cover: `data:image/png;base64,${imageee.data}`,
          id: idimport,
        }),
      });
      const resData = await response.json();
      await AsyncStorage.setItem('@image', resData.data.profile);

      console.log(resData.data.profile, 'data<<====');
      setimportImage(resData.data.profile)

    });
  };
  const save = async () => {
    console.log(image1, 'lllll');
    console.log(phone, 'phone');
    setName(route.params.item.name), setPhone(route.params.item.phone);
    // dispatch(authActions.addEmployees(name,phone,image1,idimport))
    const value = await AsyncStorage.getItem('@storage_Key');
    console.log(value, 'value');
    const response = await fetch(UPDATE_EMPLOYEE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: value,
      },
      body:
        image1 !== ''
          ? JSON.stringify({
              name: employeeName,
              cover: `data:image/png;base64,${image1}`,
              id: idimport,
            })
          : JSON.stringify({
              name: employeeName,
              // cover:`data:image/png;base64,${image1}`,
              id: idimport,
            }),
    });

    const resData = await response.json();
    navigation.goBack();
    console.log(resData.data.profile, 'data<<====');
    setimportImage(resData.data.profile)
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={false}
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />
      {/* <View style={styles.myAppointmentsHeader}>
      <View style={{marginTop:'18%',alignItems:'center'}}>
      <Text style={{fontSize:RFValue(18),color:'#FFFFFF',                    fontFamily: 'IBMPlexSansHebrew-Bold',
                    fontFamily: 'IBMPlexSansHebrew-Bold',
                  }}>
      ניהול יומנים
        </Text>
   </View>
     
      </View>   */}
      <ScrollView>
        <View style={styles.topSection}>
          <TouchableOpacity onPress={onSelectImage} activeOpacity={0.8}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: Platform.OS === 'android' ? '22%' : '26%',
              }}>
              <Image
                style={styles.profilePicture}
                //source={route.params.item? {uri:`http://18.159.82.242/v1/uploads/${image}`

                //   }:
                //   {uri:image}
                // }
                source={
                  image === ''
                    ? require('../../assets/icons/profile/profile.png')
                    : image === route.params.item.profile
                    ? {uri: `http://18.159.82.242/v1/uploads/${image}`}
                    : {uri: image}
                }
              />
            </View>
            <View
              style={{
                height:
                  Platform.OS === 'android'
                    ? verticalScale(56)
                    : verticalScale(50),
                width: scale(50),
                position: 'absolute',
                right: 110,
                borderWidth: 5,
                borderColor: 'white',
                top: moderateScale(90),
                backgroundColor: '#20304F',
                borderRadius: moderateScale(50 / 2),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Image
                  style={styles.profileimg}
                  source={require('../../assets/camera/camera.png')}
                />
              </View>
            </View>
          </TouchableOpacity>

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
              color: '#20304F',
            }}
            value={employeeName}
            onChangeText={text => setEmployeeName(text)}
          />

          <TouchableOpacity
            onPress={save}
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
              {employeeName === route.params.item.name ? 'שם העובד/ת' : 'שמירה'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: '5%',
            marginHorizontal: Platform.OS === 'android' ? '10%' : '0%',
            marginRight: Platform.OS === 'ios' ? '65%' : '0%',
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              fontFamily: 'IBMPlexSansHebrew-Bold',
              color: '#20304F',
            }}>
            קבלת קבוצות
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: '10%',
            flexDirection: 'row',
            marginTop: '5%',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{flex: 0.7}}>
            <Text
              style={{
                fontSize: RFValue(16),
                fontFamily: 'IBMPlexSansHebrew-Light',
                color: '#20304F',
                textAlign: 'left',
              }}>
              מאפשר למספר אנשים לקבוע תור לאותה שעה
            </Text>
            <View style={{marginLeft: '100%'}} />
          </TouchableOpacity>

          <View style={{flex: 0.1}}>
            <Switch
              trackColor={{false: '#767577', true: '#B1DBA6'}}
              thumbColor={'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            {/* <Switch
            style={{borderRadius: 10, marginLeft: '200%'}}
            trackColor={{false: '#767577', true: '#B1DBA6'}}
            thumbColor={'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          /> */}
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#C7CEDE',
            height: verticalScale(1.5),
            marginHorizontal: '10%',
            marginTop: '10%',
          }}
        />
        <View style={{marginTop: '4 %', margin: '5%'}}>
          <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    item.id === 0
                      ? navigation.navigate('showService', {
                          item: isEnabled,
                          idimport,
                          image,
                          employeeName,
                          importImage
                        })
                      : navigation.navigate('days', {
                          idimport,
                          image,
                          employeeName,
                          empId,
                          importImage
                        });
                  }}
                  style={{padding: '2%'}}>
                  <View
                    style={{
                      backgroundColor: item.id === 3 ? '#EAC4C4' : '#C7CEDE',
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
                        {item.text}
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
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  topSection: {
    marginTop: '13%',
    height: Platform.OS === 'android' ? verticalScale(300) : verticalScale(275),
    backgroundColor: 'white',
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  profilePicture: {
    height: moderateScale(128),
    width: moderateScale(128),
    borderRadius: moderateScale(128 / 2),
    borderWidth: 5,
    borderColor: 'white',
    marginTop: '-20%',
  },
  nameText: {
    color: '#20304F',
    // fontFamily: 'OpenSans-Bold',
    fontSize: RFValue(24),
    fontFamily: 'IBMPlexSansHebrew-Regular',
  },
  myAppointmentsHeader: {
    height: 100,
    width: windowWidth,
    backgroundColor: colors.THEME,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: '0%',
  },
});

//make this component available to the app
export default EmployeeDetails;
