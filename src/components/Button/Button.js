import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../styles/colors';
import {moderateScale, verticalScale} from '../../styles/responsiveStyles';
import {typography} from '../../styles/typography';

const Button = props => {
  const {text, onPress,style,textstyle} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.buttonView,style]}>
      <Text style={[styles.buttonText,textstyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    height: verticalScale(52),
    backgroundColor: colors.THEME,
    marginHorizontal: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
  },
  buttonText: {
    textAlign: 'center',
    fontSize: typography.FONT_SIZE18,
    color: colors.WHITE,
    fontFamily: 'IBMPlexSansHebrew-Bold',
  },
});

export default Button;
