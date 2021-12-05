//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../styles/responsiveStyles';
import {RFValue} from 'react-native-responsive-fontsize';
import Threeline from '../../assets/icons/threeLine.svg';
import MenuBar from '../../assets/icons/menubar.svg';
import Add from '../../assets/icons/Add.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cross from '../../assets/icons/cross.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import {windowWidth} from '../../utils/measurement';
import {colors} from '../../styles/colors';
import { KeyboardAwareFlatList,KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const DATA = [
  {
    id: 0,
    text: 'ג’ל רגיל',
    text1: '50 דק’',
  },
  {
    id: 1,
    text: 'ג’ל רגיל',
    text1: '50 דק’',
  },
  {
    id: 2,
    text: 'ג’ל רגיל',
    text1: '50 דק’',
  },
  {
    id: 3,
    text: 'ג’ל רגיל',
    text1: '50 דק’',
  },
];
const ShowService = ({navigation, route}) => {
  const [data, setdata] = useState(null);
  const [select, setSelect] = useState(null);
  const [expand, setexpand] = useState(false);
  const [selectt, setSelectt] = useState(null);
  const [profile, setProfile] = useState(route.params.image);
  const [loading, setloading] = useState(false);
  const [emplName, setEmpName] = useState(route.params.employeeName);
  const switchh = route.params.item;
  const importid = route.params.idimport;

  useEffect(() => {
    //    console.log(route.params.image,'<<<====++++')
    const unsubscribeNavigationFocus = navigation.addListener(
      'focus',
      async () => {
        try {
          console.log(route.params.employeeName, '//');

          getAllNews();
        } catch (error) {
          console.log('inside error');
          console.log(error);
        } finally {
        }
      },
    );

    return unsubscribeNavigationFocus;
  }, [navigation, data]);

  const getAllNews = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');

    fetch(`http://18.159.82.242/v1/services/get_services/${importid}`, {
      headers: {Authorization: value},
    })
      .then(response => response.json())
      .then(responseJson => {
        setdata(responseJson.data);
        console.log(responseJson.data, 'lllll');
      })
      .catch(error => {
        showError('Something went wrong!');

        console.log(error);
      });
  };

  const toggleExpand = selectItem => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpand(!expand);
    setSelect(selectItem);
    //  this.setState({expanded: !this.state.expanded});
  };

  const deleteHandler = async selectItem => {
    setSelectt(selectItem);
    console.log(selectItem, '_____');
    const value = await AsyncStorage.getItem('@storage_Key');

    fetch(`http://18.159.82.242/v1/services/delete/${selectItem}`, {
      method: 'DELETE',
      headers: {Authorization: value},
    })
      .then(response => response.json())
      .then(responseJson => {
        setloading(true);
        setdata(responseJson);
        setloading(false);
        console.log(responseJson, 'lllll');
        getAllNews();
      })
      .catch(error => {
        console.log(error);

        showError('Something went wrong!');
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
      <View style={styles.myAppointmentsHeader}>
        <View style={{marginTop: '17%', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: RFValue(18),
              color: '#FFFFFF',
              fontFamily: 'IBMPlexSansHebrew-Bold',
              fontFamily: 'IBMPlexSansHebrew-Bold',
            }}>
            ניהול שירותים ביומן
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddService', {
            switchh,
            importid,
            profile,
            emplName,
          });
        }}
        activeOpacity={0.8}
        style={{
          height: verticalScale(46),
          width: scale(46),
          borderRadius: moderateScale(40),
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 150,
          zIndex: 999,
          right: 50,
        }}>
        <Add />
      </TouchableOpacity>
      <View
        style={{
          marginTop: '5%',
          flexDirection: 'row',
          marginHorizontal: '13%',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: scale(46),
            height: verticalScale(46),
            borderRadius: moderateScale(46 / 2),
          }}
          source={
            profile === ''
              ? require('../../assets/icons/profile/profile.png')
              : profile === route.params.image
              ? {uri: `http://18.159.82.242/v1/uploads/${profile}`}
              : null
          }
          //   {uri: image}}
          // source={require('../../assets/icons/profile/profile.png')}

          // source={{uri: `http://18.159.82.242/v1/uploads/${profile}`}}
          //  source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
        />
        <Text
          style={{
            marginLeft: '5%',
            fontSize: RFValue(18),
            fontFamily: 'IBMPlexSansHebrew-Bold',
            color: '#5E6167',
          }}>
          {emplName}
        </Text>
      </View>
      <View style={{marginTop: '0%', margin: '5%'}}>
        {loading === true ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  // onPress={()=>{
                  //   console.log(item._id,'item')
                  // }}
                  // onPress={() => deleteHandler(item._id)}
                  style={{padding: '5%'}}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: verticalScale(80),
                      borderRadius: moderateScale(20),
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <View style={{flex: 0.8, flexDirection: 'column'}}>
                      <View style={{marginLeft: '5%'}}>
                        <Text
                          style={{
                            fontSize: RFValue(16),
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                            color: '#5E6167',
                            textAlign: 'left',
                          }}>
                          {item.name}
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            textAlign: 'left',
                            marginLeft: '5%',
                            fontSize: RFValue(14),
                            fontFamily: 'IBMPlexSansHebrew-Regular',
                            color: '#A3A4A8',
                          }}>
                          {item.time} {item.price!=="0"? `/₪ ${item.price}`:''}
                        </Text>
                        <Text> דק’</Text>
                      </View>
                    </View>
                    <View style={{flex: 0.2, alignItems: 'center'}}>
                      <TouchableOpacity
                        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
                        onPress={() => toggleExpand(item)}>
                        <MenuBar />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {expand && item === select && (
                    <View
                      style={{
                        marginLeft: '50%',
                        position: 'absolute',
                        width: 100,
                        borderRadius: moderateScale(6),
                        borderWidth: 1,
                        borderColor: '#A3A4A8',
                        top: 20,
                        height: verticalScale(60),
                        flexDirection: 'column',
                        padding: '2%',
                        backgroundColor: 'white',
                      }}>
                      <TouchableOpacity
                        style={{flexDirection: 'row', justifyContent: 'center'}}
                        onPress={() => {
                          navigation.navigate('AddService', {
                            item,
                            switchh,
                            importid,
                            profile,
                            emplName,
                          });
                        }}>
                        {/* <Icon
                          style={{marginLeft: '5%'}}
                          size={15}
                          color="#5E6167"
                          name="call-outline"
                        /> */}
                        <Text
                          style={{
                            fontFamily: 'IBMPlexSansHebrew-Regular',
                            fontSize: RFValue(16),
                            color: '#5E6167',
                          }}>
                          עריכה
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: '#A3A4A8',
                          marginHorizontal: '4%',
                        }}
                      />
                      <TouchableOpacity
                        style={{flexDirection: 'row', justifyContent: 'center'}}
                        onPress={() => deleteHandler(item._id)}>
                        <Icon
                          style={{marginLeft: '5%'}}
                          size={20}
                          color="#FC5C65"
                          name="close-circle-outline"
                        />
                        <Text
                          style={{
                            fontFamily: 'IBMPlexSansHebrew-Regular',
                            fontSize: RFValue(16),
                            color: '#FC5C65',
                          }}>
                          מחיקת שירות
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myAppointmentsHeader: {
    height: 110,
    width: windowWidth,
    backgroundColor: colors.THEME,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: '15%',
  },
});

//make this component available to the app
export default ShowService;
