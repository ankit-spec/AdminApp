//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image,Alert} from 'react-native';
import {windowWidth} from '../../utils/measurement';
import {colors} from '../../styles/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../styles/responsiveStyles';
import Button from '../../components/Button/Button';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {androidCameraPermission} from '../../../permissions';
import { REGISTER_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

androidCameraPermission;
// create a component
const DocumentScreen1 = ({route, navigation}) => {
  const bAddress = useSelector(state => state.authEmployee.logo);
  const [image, setimage] = useState('')
  const [image1, setimage1] = useState('')
  
  const name=useSelector(state=>state.authEmployee.name)
  const bemail = useSelector(state => state.authEmployee.email);
const id=useSelector(state=>state.auth.id)

  console.log(id, ';;;;');
  useEffect(() => {
    console.log(
      route.params.address,
      route.params.phonenumber,
      route.params.insta,
      route.params.bio,
     
      route.params.bioo,
      route.params.busssinessName
    );
  });

  const save = async () => {

    const value = await AsyncStorage.getItem('@storage_Key');
 
    const response = await fetch(REGISTER_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: value,
      },
      body:
        image1 !== ''
          ? JSON.stringify({
            name: name,
           
            email: bemail,
            business_name:     route.params.busssinessName,
            business_phone:  route.params.phonenumber,
            address:   route.params.busssinessName,
            instagramId:   route.params.insta,
            id:  id,
            whatsApp_phone:route.params.bioo,
            cover: `data:image/png;base64,${image1} `,
            description:route.params.bio
            })
          : JSON.stringify({
            name: name,
           
            email: bemail,
            business_name:     route.params.busssinessName,
            business_phone:  route.params.phonenumber,
            address:   route.params.busssinessName,
            instagramId:   route.params.insta,
            id:  id,
            whatsApp_phone:route.params.bioo,
          
            description:route.params.bio
            }),
    });
    const resData = await response.json();

    console.log(resData, 'data<<====');
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

  const onGallery1 = () => {
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
    }).then(imageee => {
      // setCover(imageee.path);
      // setcover1(imageee.data);
      //  console.log(imageee.data, 'data<<<====');
      setimage(imageee.path);
      setimage1(imageee.data);
      // save()
      console.log(image1, '.....');
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.myAppointmentsHeader}>
        <View style={{marginTop: '16%', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: RFValue(18),
              color: '#FFFFFF',
              fontFamily: 'IBMPlexSansHebrew-Bold',
              fontFamily: 'IBMPlexSansHebrew-Bold',
            }}>
              הגדרות עיצוב
          </Text>
        </View>
        </View>
        <View
          style={{
            marginTop: '15%',
            marginHorizontal: '10%',
            height: verticalScale(215),
            backgroundColor: 'white',
            borderRadius: moderateScale(6),
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <Text
              style={{
                color: '#5E6167',
                fontFamily: 'IBMPlexSansHebrew-Bold',
                fontSize: RFValue(16),
              }}>
              לוגו העסק
            </Text>
            {/* <Image
        style={{height:verticalScale(70),width:scale(120),marginTop:'5%'}}
        source={{uri:'https://cdn.iconscout.com/icon/free/png-256/nykaa-3384872-2822953.png'}}
        /> */}
        <TouchableOpacity      onPress={onSelectImage}>
            <Image
       
              style={{
                height: verticalScale(70),
                width: scale(120),
                marginTop: '5%',
              }}
              //source={route.params.item? {uri:`http://18.159.82.242/v1/uploads/${image}`

              //   }:
              //   {uri:image}
              // }
              source={
                image==''?
                {uri: `http://18.159.82.242/v1/uploads/${bAddress}`}:
              {uri:image}
              }
            />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: RFValue(12),
                color: '#5E6167',
                opacity: 0.6,
                fontFamily: 'IBMPlexSansHebrew-Regular',
              }}>
              לשינוי בחרו את הלוגו של העסק מתוך הגלרייה
            </Text>
          </View>
          <View
            style={{
              marginTop: '5%',
              height: verticalScale(34),
              width: scale(104),
              backgroundColor: '#C7CEDE',
              borderRadius: moderateScale(6),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#20304F',
                fontFamily: 'IBMPlexSansHebrew-Bold',
                fontSize: RFValue(14),
              }}>
              בחירת לוגו
            </Text>
          </View>
        </View>
        <Button
        onPress={save}
          textstyle={{color: '#20304F'}}
          text="שמירת שינויים"
          style={{marginTop: '10%', backgroundColor: '#C7CEDE'}}
        />
   
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myAppointmentsHeader: {
    height:verticalScale(105),
    width: windowWidth,
    backgroundColor: colors.THEME,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: '15%',
  },
});

//make this component available to the app
export default DocumentScreen1;
