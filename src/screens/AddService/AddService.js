//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Input from '../../components/Input/Input';
import {scale, verticalScale} from '../../styles/responsiveStyles';
import Button from '../../components/Button/Button';
import { showError, showSuccess } from '../../utils/helperFunction';
// create a component
const AddSerivce = () => {
  const [serviceName, setserviceName] = useState('');
  const [servicePrice, setservicePrice] = useState('');
  const [servicetTime, setservicetTime] = useState('');
  const [addnewService, setaddnewService] = useState('');
  const isValidData1 = async () => {
    if (serviceName == '') {
      showError('Please enter your Service Name');
      return;
    }
    if (servicePrice == '') {
      showError('Please enter your Service Price');
      return;
    }
    if (servicetTime == '') {
      showError('Please enter your ServiceTime');
      return;
    }
  if(addnewService===''){
    showError('Please enter your Service');
    return;
  }
showSuccess('khkhihh')
  };
  return (
    <View style={styles.container}>
      <StatusBar
        animated={false}
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />
      <View
        style={{
          marginTop: '35%',
          flexDirection: 'row',
          marginHorizontal: '13%',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: scale(40),
            height: verticalScale(46),
          }}
          source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
        />
        <Text
          style={{
            marginLeft: '5%',
            fontSize: RFValue(18),
            fontFamily: 'IBMPlexSansHebrew-Bold',
            color: '#5E6167',
          }}>
          לודמילה
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
        keyboardType="number-pad"
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
        maxLength={10}
          value={servicePrice}
          onChangeText={text => setservicePrice(text)}
        keyboardType="number-pad"
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
        maxLength={10}
         value={servicetTime}
      onChangeText={text => setservicetTime(text)}
        keyboardType="number-pad"
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
        maxLength={10}
       value={addnewService}
        onChangeText={text => setaddnewService(text)}
        keyboardType="number-pad"
        placeholder="שם השירות*"
        placeholderTextColor={'#5E6167'}
      />
      <View style={styles.cover} />
      <Button
      onPress={isValidData1}
        textstyle={{color: '#20304F'}}
        style={{backgroundColor: '#C7CEDE'}}
        text="הוספת שירות ליומן"
      />
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
});

//make this component available to the app
export default AddSerivce;
