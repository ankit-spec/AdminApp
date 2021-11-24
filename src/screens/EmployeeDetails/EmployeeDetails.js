//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Switch,
  FlatList
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../styles/responsiveStyles';
import {RFValue} from 'react-native-responsive-fontsize';
// create a component
const DATA=[
    {
        id:0,
        text:'הגדרת שירותים ליומן'
    },
    {
        id:1,
        text:'הגדרת שירותים ליומן'
    }
]
const EmployeeDetails = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={false}
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />
      <View style={styles.topSection}>
        <TouchableOpacity activeOpacity={0.8}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '22%',
            }}>
            <Image
              style={styles.profilePicture}
              source={{
                uri: 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
              }}
            />
          </View>
          <View
            style={{
              height: verticalScale(50),
              width: scale(44),
              position: 'absolute',
              right: 110,
              borderWidth: 5,
              borderColor: 'white',
              top: moderateScale(80),
              backgroundColor: '#20304F',
              borderRadius: moderateScale(44 / 2),
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
        <View style={{alignItems: 'center', marginTop: moderateScale(5)}}>
          <Text style={styles.nameText}>לודמילה</Text>
        </View>
        <View
          style={{
            marginTop: '5%',
            backgroundColor: '#C7CEDE',
            height: verticalScale(1),
            marginHorizontal: '10%',
          }}
        />
        <View
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
            שם העובד/ת
          </Text>
        </View>
      </View>
      <View style={{marginTop: '5%', marginHorizontal: '10%'}}>
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
        }}>
        <View style={{flex: 0.7}}>
          <Text
            style={{
              fontSize: RFValue(16),
              fontFamily: 'IBMPlexSansHebrew-Light',
              color: '#20304F',
            }}>
            מאפשר למספר אנשים לקבוע תור לאותה שעה
          </Text>
        </View>
        <View style={{flex: 0.1}}>
          <Switch
            style={{borderRadius: 10, marginLeft: '200%'}}
            trackColor={{false: '#767577', true: '#B1DBA6'}}
            thumbColor={'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
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
             <View style={{marginTop:'4 %',margin:'5%'}}>
<FlatList
data={DATA}
keyExtractor={item=>item.id}
renderItem={({item,index})=>{
    return(
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate('showService')
        }}
        style={{padding:'2%'}}>
            <View  style={{backgroundColor:'#C7CEDE',height:verticalScale(56),padding:'2%',borderRadius:moderateScale(10),alignItems:'center',flexDirection:'row',flex:1}}>
                <View style={{flex:0.8,flexDirection:'row',alignItems:'center'}}>
          
            <Text
               style={{
                marginLeft: '5%',
                fontSize: RFValue(16),
                fontFamily: 'IBMPlexSansHebrew-Bold',
                color: '#20304F',
              }}
            >
                
                {item.text}
            </Text>
            </View>
            <View style={{flex:0.2,alignItems:'center'}}>
            <Image
          style={{marginLeft:'60%' }}
          source={require('../../assets/icons/SideAccordian/SideAccordian.png')}
        />
        </View>
            </View>
            </TouchableOpacity>
    )
}}
/>

           </View>
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
    marginTop: '30%',
    height: verticalScale(300),
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
});

//make this component available to the app
export default EmployeeDetails;
