//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import { verticalScale } from '../../styles/responsiveStyles';
// create a component
const InputIcon = props => {
  const {Icon, value, placeholderTextColor, placeholder, onChangeText} = props;

  return (
    <View
      style={{
        height: verticalScale(52),
        backgroundColor: 'white',
        flexDirection: 'row',
      }}>
      <props.Icon />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={{height: verticalScale(52), backgroundColor: 'white'}}
      />
    </View>
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
});

//make this component available to the app
export default InputIcon;
