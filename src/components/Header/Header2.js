import React from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import {windowWidth} from '../../utils/measurement';
import ThreeLinesIcon from '../../assets/icons/threeLine.svg';
import Back from '../../assets/icons/Back.svg'
import {moderateScale, scale, verticalScale} from '../../styles/responsiveStyles';
import {typography} from '../../styles/typography';
import {colors} from '../../styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { TouchableOpacity } from 'react-native-gesture-handler';
function Header2(props) {
  const logoImage=useSelector(state=>state.authEmployee.bussinessImage)
const bussinessName=useSelector(state=>state.authEmployee.bussinessname)
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.main}>
        <View style={{marginLeft: '5%'}}>
          <ThreeLinesIcon />
        </View>
        {/* <Image
        style={{height:verticalScale(24),width:scale(90)}}
        source={{uri:`http://18.159.82.242/v1/uploads/${logoImage}`}}
        /> */}
        <Text style={styles.Text}>{bussinessName}</Text>
        <TouchableOpacity 
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        onPress={props.onPressback}
        style={{marginRight: moderateScale(12)}}>
           <Icon
        name='arrow-back-outline'
        size={25}
        />
        </TouchableOpacity>
      </View>
    {/* <View style={styles.myAppointmentsHeader}>
      <Text style={styles.myAppointmentsText}>
        {props.title}
      </Text>
      </View>  */}
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
    height: 60,
    width: windowWidth,
    backgroundColor: colors.THEME,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: '0%',
  },
  myAppointmentsText: {
    marginTop: 20,
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
export default Header2;
