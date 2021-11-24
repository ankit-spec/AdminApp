import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../../styles/colors';
import {moderateScale, verticalScale} from '../../styles/responsiveStyles';

const Input = props => {
  const {
    value,
    onChangeText,
    keyboardType,
    placeholder,
    placeholderTextColor,
    autoCapitalize,
    maxLength,
    style,
  } = props;

  return (
    <View style={[styles.inputview]}>
      <TextInput
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={([styles.input], style)}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputview: {
    height: verticalScale(52),
    marginHorizontal: moderateScale(50),
    borderWidth: 1,
    borderColor:'#C7CEDE',
    borderRadius: moderateScale(6),
    backgroundColor: colors.WHITE,

    justifyContent:'center'
  },
  input: {
    textAlign: 'center',
  
  },
});

export default Input;
