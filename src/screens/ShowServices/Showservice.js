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
  Platform,
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
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
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
  const [imageget, setimsgeget] = useState(null);
  const [image, setImage] = useState(route.params.importImage!==''?route.params.importImage:'')
  const switchh = route.params.item;
  const importid = route.params.idimport;
  const idd = useSelector(state => state.auth.id);

  const getAllNewss = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');

    fetch(`http://18.159.82.242/v1/business/get_employees/${idd}`, {
      headers: {Authorization: value},
    })
      .then(response => response.json())
      .then(responseJson => {
       // setdata(responseJson.data.data);
        //  navigation.navigate('AppTabNavigator')
        console.log(JSON.stringify(responseJson), 'responseJson');
        //   setRegisterData({bussinessdata:responseJson.data.businessId})
        // console.log(respon,'<<<<=====')
      })
      .catch(error => {
        console.log(error);

        showError('Something went wrong!');
      });
  };

  useEffect(() => {
    getImage();
     console.log(route.params.importImage,'<<<====++++')
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
  const getImage = async () => {
    let imageimport = await AsyncStorage.getItem('@image');
    console.log(imageimport, 'ooooo');
    setimsgeget(imageimport);
  };
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
      {console.log(imageget, 'lllllpppp')}
      <KeyboardAwareScrollView>
        <View style={styles.myAppointmentsHeader}>
          <View style={{marginTop: '16%', alignItems: 'center'}}>
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
            height:
              Platform.OS === 'android' ? verticalScale(52) : verticalScale(46),
            width: scale(46),
            borderRadius: moderateScale(40),
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 140,
            zIndex: 999,
            right: 40,
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
              height:
                Platform.OS === 'android'
                  ? verticalScale(52)
                  : verticalScale(46),
              borderRadius: moderateScale(46 / 2),
            }}
            
          
            source={
              profile === ''
                ? require('../../assets/icons/profile/profile.png'):route.params.importImage!==''
                ?

                {uri: `http://18.159.82.242/v1/uploads/${route.params.importImage}`}

                :{uri: `http://18.159.82.242/v1/uploads/${route.params.image}`}
                
              
            }
          />
          {console.log(route.params.importImage,route.params.image,'][][][][')}
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
                            {item.time}{' '}
                            {item.price !== '0' ? `/₪ ${item.price}` : ''}
                          </Text>
                          <Text
                            style={{
                              fontSize: RFValue(14),
                              fontFamily: 'IBMPlexSansHebrew-Regular',
                              color: '#A3A4A8',
                            }}>
                            {' '}
                            דק’
                          </Text>
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
                          height: verticalScale(65),
                          flexDirection: 'column',
                          padding: '2%',
                          backgroundColor: 'white',
                        }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom:'5%'
                          }}
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
                              fontSize: RFValue(14),
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
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop:'5%'
                          }}
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
                              fontSize: RFValue(14),
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
    height: Platform.OS === 'ios' ? 105 : 60,
    width: windowWidth,
    backgroundColor: colors.THEME,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: '15%',
  },
});

//make this component available to the app
export default ShowService;
// //import liraries
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   LayoutAnimation,
//   Switch,
// } from 'react-native';
// import {windowWidth} from '../../utils/measurement';
// import {RFValue} from 'react-native-responsive-fontsize';
// import {colors} from '../../styles/colors';
// import {
//   scale,
//   verticalScale,
//   moderateScale,
// } from '../../styles/responsiveStyles';
// import Accordian from '../../components/Accordian/Accordian';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {setEnabled} from 'react-native/Libraries/Performance/Systrace';
// import Icon from 'react-native-vector-icons/Ionicons';
// const DAYS = [
//   {
//     id: 1,
//     day: 'יום ראשון',
//     value: true,
//   },
//   {
//     id: 2,
//     day: 'יום שני',
//     value: true,
//   },
//   {
//     id: 3,
//     day: 'יום שלישיי',
//     value: false,
//   },
//   {
//     id: 4,
//     day: 'יום רביעי',
//     value: false,
//   },
//   {
//     id: 5,
//     day: 'יום חמישי',
//     value: false,
//   },
//   {
//     id: 6,
//     day: 'יום שישי',
//     value: false,
//   },
//   {
//     id: 7,
//     day: 'יום שבת',
//     value: false,
//   },
// ];

// const DaysScreen = ({navigation}) => {
//   const [expand, setexpand] = useState(true);
//   const [isEnabled, setisEnabled] = useState(true);
//   const [data,setData]=useState([])
//   const toggleSwitch1 = (ind) => {
   
//     let arr=DAYS.map((item,index)=>{
//       if (ind === index) {
//         setisEnabled(
//           !item.value
//         )
//       }
     
//     })
//     setData(arr)

//   console.log(arr,'arr')

//   };

//   const toggleExpand = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setexpand(!expand);
//   };
//   const renderAccordians = () => {
//     //   const items = [];
//     //   for (item of DAYS) {
//     //     items.push(<Accordian title={item.day} value={item.value} />);
//     //   }
//     //   return items
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.myAppointmentsHeader}>
//         <View style={{marginTop: '5%', alignItems: 'center'}}>
//           <Text
//             style={{
//               fontSize: RFValue(18),
//               color: '#FFFFFF',
//               //fontFamily: 'IBMPlexSansHebrew-Bold',
//             }}>
//             ניהול שירותים ביומן
//           </Text>
//         </View>
//       </View>
//       <View style={{marginHorizontal: '10%'}}>
//         <View
//           style={{
//             marginTop: '8%',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Image
//               style={{
//                 width: scale(46),
//                 height:
//                   Platform.OS === 'android'
//                     ? verticalScale(52)
//                     : verticalScale(46),
//                 borderRadius: moderateScale(46 / 2),
//               }}
//               source={require('../../assets/icons/profile/profile.png')}
//               //   {uri: image}}
//               // source={require('../../assets/icons/profile/profile.png')}

//               // source={{uri: `http://18.159.82.242/v1/uploads/${profile}`}}
//               //  source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
//             />
//             <Text
//               style={{
//                 marginLeft: '5%',
//                 fontSize: RFValue(18),
//                 //   fontFamily: 'IBMPlexSansHebrew-Bold',
//                 color: '#5E6167',
//               }}>
//               לודמילה
//             </Text>
//           </View>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('blockday');
//             }}
//             style={{
//               height: verticalScale(32),
//               backgroundColor: '#C7CEDE',
//               borderRadius: moderateScale(16),
//               paddingHorizontal: '5%',
//               alignItems: 'center',
//               paddingVertical: '1%',
//             }}>
//             <Text
//               style={{
//                 textAlign: 'center',
//                 fontSize: RFValue(14),
//                 //  fontFamily: 'IBMPlexSansHebrew-Bold',
//                 color: '#20304F',
//               }}>
//               תאריכים חסומים
//             </Text>
//           </TouchableOpacity>
//         </View>
//         {DAYS.map((item, index) => {
//           return (
//             <View>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   paddingVertical: '5%',
//                 }}>
//                 <View>
//                   <Text
//                     style={{
//                       fontSize: RFValue(16),
//                       //  fontFamily: 'IBMPlexSansHebrew-Bold',
//                       color: '#20304F',
//                     }}>
//                     {item.day}
//                   </Text>
//                 </View>
//                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                   <View>
//                     <Switch
//                       style={{borderRadius: 10}}
//                       trackColor={{false: '#767577', true: '#B1DBA6'}}
//                       thumbColor={'white'}
//                       ios_backgroundColor="#3e3e3e"
//                       onValueChange={toggleSwitch1}
//                       value={isEnabled}
//                     />
//                   </View>
//                   <TouchableOpacity
//                     onPress={() => toggleExpand()}
//                     style={{marginLeft: 10}}>
//                     {expand ? (
//                       <Icon
//                         size={18}
//                         color="#5E6167"
//                         name="chevron-up-outline"
//                       />
//                     ) : (
//                       <Icon
//                         size={18}
//                         color="#5E6167"
//                         name="chevron-down-outline"
//                       />
//                     )}
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               {/* {expand && (
//                 <View
//                   style={{
//                     paddingVertical: 10,
//                     paddingHorizontal: 5,
//                     paddingBottom: 5,
//                   }}></View>
//               )} */}
//               <View
//                 style={{marginTop: 10, height: 1, backgroundColor: '#C7CEDE'}}
//               />
//             </View>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   myAppointmentsHeader: {
//     height: Platform.OS === 'ios' ? 110 : 60,
//     width: windowWidth,
//     backgroundColor: colors.THEME,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     marginTop: '15%',
//   },
// });

// //make this component available to the app
// export default DaysScreen;
