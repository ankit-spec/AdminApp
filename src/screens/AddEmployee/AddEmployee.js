//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, Image} from 'react-native';
import Input from '../../components/Input/Input';
import ImagePicker from 'react-native-image-crop-picker';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  moderateScale,
  verticalScale,
  scale,
} from '../../styles/responsiveStyles';
import {androidCameraPermission} from '../../../permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-share';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CREATE_EMPLOYEE} from '../../config/config';
androidCameraPermission;
// create a component
const AddEmployee = () => {
  const idd = useSelector(state => state.auth.id);

  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [image, setimage] = useState('');
  const [image1, setimage1] = useState('');
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Gallery', onPress: onGallery},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };

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

  const imageUpload = async (data, data1) => {
    const value = await AsyncStorage.getItem('@storage_Key');

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body: JSON.stringify({
        name: name,
        phone: phone,
        file: `data:image/png;base64,${image1}`,
        createdBy: idd,
      }),
    };

    fetch(CREATE_EMPLOYEE, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, ';;;;');
      });
    // navigation.navigate('BussinessId');
  };
  return (
    <View style={styles.container}>
      <View style={{marginTop: '20%'}}>
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
          onChangeText={text => setname(text)}
          keyboardType="default"
          placeholder="שם מלא*"
          placeholderTextColor={'#5E6167'}
        />
        <Input
          style={{
            textAlign: 'right',
            fontSize: RFValue(16),
            fontFamily: 'IBMPlexSansHebrew-Regular',
            color: '#5E6167',
            marginHorizontal: '5%',
          }}
          // maxLength={10}
          value={phone}
          onChangeText={text => setphone(text)}
          keyboardType="number-pad"
          placeholder="שם מלא*"
          placeholderTextColor={'#5E6167'}
        />
      </View>
      <View>
        {image === '' ? (
          <TouchableOpacity onPress={onSelectImage} style={{marginTop: '50%'}}>
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
          </TouchableOpacity>
        ) : (
          <Image
            style={{height: verticalScale(153), width: scale(275)}}
            source={{
              uri: image,
            }}
          />
        )}
        <Button onPress={imageUpload} />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default AddEmployee;
