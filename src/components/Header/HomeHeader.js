import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {windowWidth} from '../../utils/measurement';
import ThreeLinesIcon from '../../assets/icons/threeLine.svg';

import {moderateScale, verticalScale} from '../../styles/responsiveStyles';
import {typography} from '../../styles/typography';
import {colors} from '../../styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

function HomeHeader(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.main}>
        <View style={{marginLeft: '5%'}}>
          <ThreeLinesIcon />
        </View>
        <Text style={styles.Text}>Logo Here</Text>
        <View style={{marginRight: moderateScale(12)}}>
          <Text style={{color: 'white'}}>ihihih</Text>
        </View>
      </View>
      <View style={styles.myAppointmentsHeader}>
        <Text style={styles.myAppointmentsText}>{props.title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    height: verticalScale(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    zIndex: 9999,
  },
  Text: {
    fontSize: typography.FONT_SIZE20,
    color: colors.THEME,
    fontFamily: 'IBMPlexSansHebrew-Bold',
  },
  myAppointmentsHeader: {
    height: 110,
    width: windowWidth,
    backgroundColor: colors.THEME,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: '-15%',
  },
  myAppointmentsText: {
    marginTop: 70,
    color: '#ffffff',
    alignSelf: 'center',
    // fontWeight:'bold',
    fontSize: typography.FONT_SIZE16,
    fontFamily: 'IBMPlexSansHebrew-Bold',
  },
  heading: {
    marginTop: '10%',
    marginLeft: '10%',
  },
  headingtxt: {
    fontSize: typography.FONT_SIZE22,
    fontFamily: 'IBMPlexSansHebrew-Bold',
    color: colors.BLACK,
  },
});
export default HomeHeader;
