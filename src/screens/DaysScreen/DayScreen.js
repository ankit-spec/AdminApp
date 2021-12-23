// //import liraries
// import React, {Component} from 'react';
// import {View, Text, StyleSheet, Image} from 'react-native';
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
// const DAYS = [
//   {
//     id: 1,
//     day: 'יום ראשון',
//     value: false,
//   },
//   {
//     id: 2,
//     day: 'יום שני',
//     value: false,
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
//   const renderAccordians = item => {
//     const items = [];
//     for (item of DAYS) {
//       items.push(<Accordian title={item.day} value={item.value} />);
//     }
//     console.log(items,'items')
//     return items;

//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.myAppointmentsHeader}>
//         <View style={{marginTop: '5%', alignItems: 'center'}}>
//           <Text
//             style={{
//               fontSize: RFValue(18),
//               color: '#FFFFFF',
//               fontFamily: 'IBMPlexSansHebrew-Bold',
//               fontFamily: 'IBMPlexSansHebrew-Bold',
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
//                 fontFamily: 'IBMPlexSansHebrew-Bold',
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
//                 fontFamily: 'IBMPlexSansHebrew-Bold',
//                 color: '#20304F',
//               }}>
//               תאריכים חסומים
//             </Text>
//           </TouchableOpacity>
//         </View>
//         {renderAccordians()}
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

// import React, { Component } from 'react';
// import { FlatList, StyleSheet, Text, View, Switch } from 'react-native';
// const cloneDeep = require('clone-deep');

// class InterestsList extends Component {
//   constructor() {
//     super();
//     this.state = {
//        listKeys: [
//       {key: 'Basketball', switch : false},
//       {key: 'Football', switch : false},
//       {key: 'Baseball', switch : false},
//       {key: 'Soccer', switch : false},
//       {key: 'Running', switch : false},
//       {key: 'Cross Training', switch : false},
//       {key: 'Gym Workout', switch : false},
//       {key: 'Swimming', switch : false},
//     ]
//     }
//   }

//   setSwitchValue = (val, ind) => {
//       const tempData = cloneDeep(this.state.listKeys);
//       tempData[ind].switch = val;
//       this.setState({ listKeys: tempData });
//       console.log(this.state.listKeys,'tempdate')
//   }

//   listItem = ({item, index}) => (
//     <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
//       <Text style={styles.item}>{item.key}</Text>
//       <Switch
//         onValueChange={(value) => this.setSwitchValue(value, index)}
//         value={item.switch}
//       />
//     </View>
//   );

//   render() {
//     return (
//       <FlatList
//         data={this.state.listKeys}
//         renderItem={this.listItem}
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//    flex: 1,
//    paddingTop: 22
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// })

// export default InterestsList;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  LayoutAnimation,
  Switch,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {windowWidth} from '../../utils/measurement';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../styles/colors';
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../styles/responsiveStyles';
import Accordian from '../../components/Accordian/Accordian';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button/Button';
import {showError, showSuccess} from '../../utils/helperFunction';
import {CREATE_SCHEDULE} from '../../config/config';
import moment from 'moment';

const cloneDeep = require('clone-deep');

const DaysScreen = ({navigation, route}) => {
  const [expand, setexpand] = useState(false);
  const [select, setSelect] = useState(null);
  const [getServices, setgetServices] = useState([]);
  const [profile, setProfile] = useState(route.params.image);
  const [emplName, setEmpName] = useState(route.params.employeeName);
  const [imageget, setimsgeget] = useState(null);
  const emplId = route.params.empId;

  const importid = route.params.idimport;

  const [newServices, setnewServices] = useState([]);
  const [starttime, setstarttime] = useState('');
  const [loading, setloading] = useState(false);
  const [result, setresult] = useState('')
  // const deleteHandler = key => {
  //   const _inputs = inputlist.filter((input, index) => index != key);
  //   setinputlist(_inputs);
  // };

  useEffect(() => {
    manipulate();
    getAllNews();
    getImage();
  }, []);

  useEffect(() => {
    const unsubscribeNavigationFocus = navigation.addListener(
      'focus',
      async () => {
        try {
          setloading(true);

          getSchedule();

          setloading(false);
        } catch (error) {
          console.log('inside error');
          console.log(error);
        } finally {
        }
      },
    );

    return unsubscribeNavigationFocus;
  }, [loading, navigation, data,apiData]);

  const getAllNews = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');
    setloading(true);
    fetch(`http://18.159.82.242/v1/services/get_services/${importid}`, {
      headers: {Authorization: value},
    })
    .then(resp => {
      return resp.json();
    })
      .then(responseJson => {
        setgetServices(responseJson.data);
        setloading(false);
      //  console.log(responseJson, 'response');
      })
      .catch(error => {
        showError('Something went wrong!');

        console.log(error);
      });
  };

  const [isEnabled, setisEnabled] = useState(true);
  
  const [data, setData] = useState([
    {
      id: 1,
      name: 'יום ראשון',
      status: false,
      timing: [],
    },
    {
      id: 2,
      name: 'יום שני',
      status: false,
      timing: [],
    },
    {
      id: 3,
      name: 'יום שלישיי',
      status: false,
      timing: [],
    },
    {
      id: 4,
      name: 'יום רביעי',
      status: false,
      timing: [],
    },
    {
      id: 5,
      name: 'יום חמישי',
      status: false,
      timing: [],
    },
    {
      id: 6,
      name: 'יום שישי',
      status: false,
      timing: [],
    },
    {
      id: 7,
      name: 'יום שבת',
      status: false,
      timing: [],
    },
  ]);
  const [inputlist, setinputlist] = useState([]);
  const [dummyState, setdummyState] = useState(0);
  const [checkbox, setcheckbox] = useState(0);
  const [apiData, setApiData] = useState([]);
  const setSwitchValue = (val, ind) => {
    const tempData = cloneDeep(data);
    tempData[ind].status = val;
    setData(tempData);
  };

  const setSwitchValue1 = (val, ind) => {
    const tempData = cloneDeep(apiData);
    tempData[ind].status = val;
    setApiData(tempData);
  };

  const toggleExpand = selectItem => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpand(!expand);
    setSelect(selectItem);
  };

  const manipulate = () => {
    const newArrayOfObj = getServices.map(({_id: id, ...rest}) => ({
      id,
      ...rest,
    }));
    let newArr = newArrayOfObj.map(function (obj) {
      delete obj.__v,
        delete obj.createdAt,
        delete obj.description,
        delete obj.employeeId,
        delete obj.maximumQueue,
        delete obj.price,
        delete obj.time;
      return obj;
    });
    setnewServices(newArr);
  };

  const addHandler = () => {
    const newArrayOfObj = getServices.map(({_id: id, ...rest}) => ({
      id,
      ...rest,
    }));

    // console.log(newArrayOfObj,'099')
    let newArr = newArrayOfObj.map(function (obj) {
      delete obj.__v,
        delete obj.createdAt,
        delete obj.description,
        delete obj.employeeId,
        delete obj.maximumQueue,
        delete obj.price,
        delete obj.time;
      obj.isselected = true;
      return obj;
    });

    // console.log(newArr, 'llll-----');

    if (expand === true) {
      let apo = data.map((item, index) => {
        if (item.timing.length < 5) {
          item === select
            ? item.timing.push({
                start_time: '',
                key: index,
                end_time: '',
                services: newArr,
              })
            : null;
          // console.log(item.timing,'kop')
          setdummyState(dummyState + 1);
        } 

     //   console.log(JSON.stringify(data), 'opo');
      });
    }

    //console.log(data,'lp')
  };



  const addHandler1 = () => {
    const newArrayOfObj = getServices.map(({_id: id, ...rest}) => ({
      id,
      ...rest,
    }));

    // console.log(newArrayOfObj,'099')
    let newArr = newArrayOfObj.map(function (obj) {
      delete obj.__v,
        delete obj.createdAt,
        delete obj.description,
        delete obj.employeeId,
        delete obj.maximumQueue,
        delete obj.price,
        delete obj.time;
      obj.isselected = true;
      return obj;
    });

    // console.log(newArr, 'llll-----');

    if (expand === true) {
      let apo = apiData.map((item, index) => {
        if (item.timing.length < 5) {
          item === select
            ? item.timing.push({
                start_time: '',
                key: index,
                end_time: '',
                services: newArr,
              })
            : null;
           console.log(JSON.stringify(item.timing),'kop')
          setdummyState(dummyState + 1);
        } 
     //   console.log(JSON.stringify(data), 'opo');
      });
    }

    //console.log(data,'lp')
  };

  // const addHandler1 = () => {
  //  // console.log(getServices,'llll')

  //   const newArrayOfObj = getServices.map(({_id: id, ...rest}) => ({
  //     id,
  //     ...rest,
  //   }));

  //   // console.log(newArrayOfObj,'099')
  //   let newArr = newArrayOfObj.map(function (obj) {
  //     delete obj.__v,
  //       delete obj.createdAt,
  //       delete obj.description,
  //       delete obj.employeeId,
  //       delete obj.maximumQueue,
  //       delete obj.price,
  //       delete obj.time;
  //     obj.isselected = true;
  //     return obj;
  //   });

  // //  console.log(newArr, 'llll-----');

  //   if (expand === true) {
  //     let apo = apiData.map((item, index) => {
  //       if (item.timing.length < 3) {
      
  //            item.timing.push({
  //               start_time: '',
  //               key: index,
  //               end_time: '',
  //               services: newArr,
  //             })
           
  //        console.log(JSON.stringify(item.timing),'kop')
  //         setdummyState(dummyState + 1);
  //       } else {
  //         showError('You cant add more slots');
  //       }

  //    //   console.log(JSON.stringify(data), 'opo');
  //     });
  //   }

  //   //console.log(data,'lp')
  // };

  const deleteHandler = (key, index) => {
    const abcd = data[index].timing.splice(key, 1);
  //  console.log(abcd, 'ppppppp');
    setdummyState(dummyState - 1);
  };

  const deleteHandler1 = (key, index) => {
    const abcd = apiData[index].timing.splice(key, 1);
  //  console.log(abcd, 'ppppppp');
    setdummyState(dummyState - 1);
  };

  // const onPressItem = (item, ind) => {
  //   let arr = seatData.map((item, index) => {
  //     if (ind === index) {
  //       item.isselected = !item.isselected;
  //     }
  //     return { ...item };
  //   });
  //   setseat(arr);

  //   let newArr = arr.filter((item) => item.isselected === true);
  //   //console.log(newArr,'newarr')

  //   let lastarray = newArr.map(function (i) {
  //     return i.seatMappingId;
  //   });
  //   setfnlarray(lastarray);
  //   console.log(lastarray, "lastarray");

  // };

  const getSchedule = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');
    fetch(
      `http://18.159.82.242/v1/schedule/get_schedule/${emplId}`,
      {
        headers: {Authorization: value},
      },
    )
      .then(resp => {
        return resp.json();
      })
      .then(data => {
      console.log('===>>>',JSON.stringify(data));
        setresult(data)
        setApiData(data.data.days);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onPressItem = (dataIndex, timingIndex, item, serviceindex, status) => {
    // setcheckbox(ind)
  //  console.log('index', dataIndex, timingIndex, item, serviceindex);
    let newArr;
    data[dataIndex].timing[timingIndex].services[serviceindex].isselected =
      !data[dataIndex].timing[timingIndex].services[serviceindex].isselected;
    // console.log('new arr',JSON.stringify(filtered));
    if (
      data[dataIndex].timing[timingIndex].services[serviceindex].isselected ==
      false
    ) {
      data[dataIndex].timing[timingIndex].services[serviceindex].status = false;
    }
    setdummyState(dummyState + 1);
  };

  const onPressItem1 = (dataIndex, timingIndex, item, serviceindex, status) => {
    // setcheckbox(ind)
  //  console.log('index', dataIndex, timingIndex, item, serviceindex);
    let newArr;
    apiData[dataIndex].timing[timingIndex].services[serviceindex].isselected =
      !apiData[dataIndex].timing[timingIndex].services[serviceindex].isselected;
    // console.log('new arr',JSON.stringify(filtered));
    if (
      apiData[dataIndex].timing[timingIndex].services[serviceindex].isselected ==
      false
    ) {
      apiData[dataIndex].timing[timingIndex].services[serviceindex].status = false;
    }
    setdummyState(dummyState + 1);
  };

  const save = async () => {
  
    let newData = data.map(function (obj) {
      delete obj.id;
    });

    data.map((item, index) => {
      item.timing.map(function (obj) {
        delete obj.key;
      });
    });

    data.map((item, index) => {
      item.timing.map((i, v) => {
        i.services.map(function (obj) {
          delete obj.name, delete obj.isselected;
        });
      });
    });

  //  console.log(JSON.stringify(data),'data')
   

    const value = await AsyncStorage.getItem('@storage_Key');

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body: JSON.stringify({
        employeeId: importid,
        days: data,
      }),
    };

    fetch(CREATE_SCHEDULE, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
       console.log(responseJson, ';;;;');
        showSuccess('Schedule saved');
      })
      .catch(error => {
        console.log(error);

        showError('Something went wrong!');
      });

    // console.log('filtered', JSON.stringify(data));
  };


  const save1 = async () => {
 // console.log(apiData,'lll')
  
    // let newData = apiData.map(function (obj) {
    //   delete obj.id;
    // });

    // apiData.map((item, index) => {
    //   item.timing.map((i, v) => {
    //     i.services.map(function (obj) {
    //       delete obj.name, delete obj.isselected;
    //     });
    //   });
    // });
   
     let newData = apiData.map(function (obj) {
      delete obj._id;
     });

     apiData.map((item, index) => {
      item.timing.map(function(obj){
       delete obj.key,delete obj._id
      }
      )
    });
    //  apiData.map((item, index) => {
    //   item.timing.map((i, v) => {
    //     i.services.map(function (obj) {
    //       delete obj.name, delete obj.isselected
    //     });
    //   });
    // });
    
  //   console.log(JSON.stringify(apiData),'api')

    const value = await AsyncStorage.getItem('@storage_Key');

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body: JSON.stringify({
        employeeId: importid,
        days: apiData,
      }),
    };
    console.log(JSON.stringify(apiData,'api'))
    fetch(CREATE_SCHEDULE, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
       console.log(responseJson, ';;;;');
        showSuccess('Schedule savedd');
      })
      .catch(error => {
        console.log(error);

        showError('Something went wrong!');
      });

    // console.log('filtered', JSON.stringify(data));
  };
  const getImage = async () => {
    let imageimport = await AsyncStorage.getItem('@image');
    //console.log(imageimport, 'ooooo');
    setimsgeget(imageimport);
  };

  const image11=route.params.importImage;
  const image12=route.params.image
  return (
    <View style={styles.container}>
       <View style={styles.myAppointmentsHeader}>
        <View style={{marginTop: '16%', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: RFValue(18),
              color: '#FFFFFF',
              fontFamily: 'IBMPlexSansHebrew-Bold',
             
            }}>
              ימים ושעות קבלה
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: '3%'}}>
        {loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <View>
            <View
              style={{
                marginTop: '4%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginTop: '5%',
                  flexDirection: 'row',

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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('blockday',{
                    importid,
                    emplName,
                    image11,
                    image12
                  });
                }}
                style={{
                  height: verticalScale(32),
                  backgroundColor: '#C7CEDE',
                  borderRadius: moderateScale(16),
                  paddingHorizontal: '5%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '10%',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: RFValue(14),
                    fontFamily: 'IBMPlexSansHebrew-Bold',
                    color: '#20304F',
                  }}>
                  תאריכים חסומים
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{height: 20}} />
          
            
              {result.code===200?
            
              apiData.map((item, index) => {
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: '5%',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: RFValue(16),
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                            color: '#20304F',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <View
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <View>
                          <Switch
                            style={{borderRadius: 10}}
                            trackColor={{false: '#767577', true: '#B1DBA6'}}
                            thumbColor={'white'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={status =>
                              setSwitchValue1(status, index)
                            }
                            value={item.status}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => toggleExpand(item)}
                          style={{marginLeft: 10}}>
                          {expand &&item===select ? (
                            <Icon
                              size={18}
                              color="#5E6167"
                              name="chevron-up-outline"
                            />
                          ) : (
                            <Icon
                              size={18}
                              color="#5E6167"
                              name="chevron-down-outline"
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                    {expand && item == select && (
                      <View
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 5,
                          paddingBottom: 5,
                        }}>
                          {item.timing.length>0?
                        null:
                        <View style={{alignItems:'center',justifyContent:'center',paddingBottom:'5%'}}>
                        <TouchableOpacity
                        onPress={addHandler1}
                        style={{
                          height: verticalScale(32),
                          width: scale(32),
                          borderRadius: moderateScale(16),
                          backgroundColor: '#C7CEDE',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            marginTop: -5,
                            fontSize: 30,
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                            color: 'black',
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                      </View>
                        }
                          
                     
                        {item.timing.map((input, key) => {
                         
                          return (
                            <View>
                              <View
                                key={key}
                                style={{
                                  alignItems: 'center',

                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontSize: RFValue(15),
                                    fontFamily: 'IBMPlexSansHebrew-Light',
                                    color: '#20304F',
                                  }}>
                                  שעות קבלה:
                                </Text>

                                <TextInput
                                  value={input.start_time}
                                  onChangeText={text => {
                                    input.start_time = text;
                                    setdummyState(dummyState + 1);
                                    console.log(text);
                                  }}
                                  //  value={i.start_time}
                                  style={{
                                    height: verticalScale(46),
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: moderateScale(6),
                                    marginLeft: '3%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    borderColor: '#C7CEDE',
                                    borderWidth: 0.5,
                                    width: '20%',
                                    fontSize: RFValue(16),
                                    fontFamily: 'IBMPlexSansHebrew-Regular',
                                    color: '#5E6167',
                                  }}
                                />

                                <View style={{marginLeft: '2%'}}>
                                  <Text
                                    style={{
                                      fontSize: 30,
                                      fontFamily: 'IBMPlexSansHebrew-Regular',
                                      color: '#5E6167',
                                      marginLeft: '3%',
                                    }}>
                                    -
                                  </Text>
                                </View>
                                <TextInput
                                  value={input.end_time}
                                  onChangeText={text => {
                                    input.end_time = text;
                                    setdummyState(dummyState + 1);
                                    console.log(text);
                                  }}
                                  // onChangeText={text => inputHandler(text, key)}
                                  //  value={i.start_time}
                                  style={{
                                    height: verticalScale(46),
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: moderateScale(6),
                                    width: '20%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    borderColor: '#C7CEDE',
                                    borderWidth: 0.5,
                                    marginLeft: '3%',
                                    fontSize: RFValue(16),
                                    fontFamily: 'IBMPlexSansHebrew-Regular',
                                    color: '#5E6167',
                                  }}
                                />
   <View
                                style={{width:10}}
                                />
                                <TouchableOpacity
                                  onPress={addHandler1}
                                  style={{
                                    height: verticalScale(32),
                                    width: scale(32),
                                    borderRadius: moderateScale(16),
                                    backgroundColor: '#C7CEDE',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: '2%',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 24,
                                      
                                      textAlign: 'center',
                                      marginTop: -5,
                                      fontFamily: 'IBMPlexSansHebrew-Bold',
                                      color: 'black',
                                    }}>
                                    +
                                  </Text>
                                </TouchableOpacity>
                                {key !== 0 && (
                                  <TouchableOpacity
                                    onPress={() => deleteHandler1(key, index)}
                                    style={{
                                      height: verticalScale(32),
                                      width: scale(32),
                                      borderRadius: moderateScale(16),
                                      backgroundColor: '#C7CEDE',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        marginTop: -5,
                                        fontSize: 24,
                                        fontFamily: 'IBMPlexSansHebrew-Bold',
                                        color: 'black',
                                      }}>
                                      -
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                              {input.services.length>0&&
                                 <View style={{marginTop: '5%'}}>
                                 <Text
                                   style={{
                                     fontSize: RFValue(13),
                                     opacity: 0.5,
                                     color: '#20304F',
                                     textAlign: 'left',
                                     fontFamily: 'IBMPlexSansHebrew-Bold',
                                     //  fontFamily: 'IBMPlexSansHebrew-Bold ',
                                   }}>
                                   שירותים לחלון זמנים
                                 </Text>
                               </View>
                              }
                           
                              <View
                                style={{
                                  flexWrap: 'wrap',
                                  flexDirection: 'row',
                                  width: '100%',
                                }}>
                                {input.services.map((item, serindex) => {
                                  console.log(item.id.name,'irem')
                                  let value = item.isselected;
                                  return (
                                    <View
                                      style={{
                                        width: '50%',
                                        flexDirection: 'row',
                                        padding: '5%',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          onPressItem1(
                                            index,
                                            key,
                                            item,
                                            serindex,
                                            value,
                                          )
                                        }
                                        style={{
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          height: verticalScale(36),
                                          width: scale(36),
                                          borderRadius: moderateScale(18),
                                          borderWidth: 1,
                                          borderColor: '#C7CEDE',
                                          backgroundColor: item.isselected ||item.status===true
                                            ? '#C7CEDE'
                                            : '#F5F5F5',
                                        }}>
                                        {item.isselected || item.status===true ? (
                                          <Icon
                                            color="#FFFFFF"
                                            size={30}
                                            name="checkmark-outline"
                                          />
                                        ) : null}
                                      </TouchableOpacity>
                                      <View style={{marginLeft: 10}}>
                                        <Text
                                          style={{
                                            color: '#20304F',
                                            fontFamily:
                                              'IBMPlexSansHebrew-Light',
                                            fontSize: 15,
                                          }}>
                                          {item.id.name || item.name}
                                        </Text>
                                      </View>
                                    </View>
                                  );
                                })}
                              </View>
                            </View>
                          );
                        })}
                        {item.timing.length>0&&
                          <Button
                          onPress={
                            apiData.length>0?
                            save1:
                            save
                          }
                          text="שמירה‎"
                          style={{width:'30%',height:35,alignItems:'center',justifyContent:'center',marginLeft:'35%'}}
                        />
                        }
                          
                      </View>
                    )}
                           
                    <View
                      style={{
                        marginTop: 10,
                        height: 1,
                        backgroundColor: '#C7CEDE',
                      }}
                    />
                  </View>
                );
              }):
           
              data.map((item, index) => {
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: '5%',
                      
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: RFValue(16),
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                            color: '#20304F',
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      <View
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <View>
                          <Switch
                            style={{borderRadius: 10}}
                            trackColor={{false: '#767577', true: '#B1DBA6'}}
                            thumbColor={'white'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={status =>
                              setSwitchValue(status, index)
                            }
                            value={item.status}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => toggleExpand(item)}
                          style={{marginLeft: 10}}>
                          {expand &&item===select ? (
                            <Icon
                              size={18}
                              color="#5E6167"
                              name="chevron-up-outline"
                            />
                          ) : (
                            <Icon
                              size={18}
                              color="#5E6167"
                              name="chevron-down-outline"
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                    {expand && item == select && (
                      <View
                        style={{
                          
                          paddingHorizontal: 5,
                          paddingBottom: 10,
                        }}>
                          {item.timing.length>0?
                        null:
                        <View style={{alignItems:'center',justifyContent:'center',paddingBottom:'5%'}}>
                        <TouchableOpacity
                        onPress={addHandler}
                        style={{
                          height: verticalScale(32),
                          width: scale(32),
                          borderRadius: moderateScale(16),
                          backgroundColor: '#C7CEDE',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop:'-2%',
                          justifyContent:'center',
                          alignItems:'center',
                          
                        }}>
                        <Text
                          style={{
                            marginTop: -5,
                            fontSize: 24,
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                            color: 'black',
                            textAlign:'center'
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                      </View>
                        }
                      
                        
                        {item.timing.map((input, key) => {
                       
                          return (
                            <View>
                              <View
                                key={key}
                                style={{
                                  alignItems: 'center',

                                  flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontSize: RFValue(15),
                                    fontFamily: 'IBMPlexSansHebrew-Light',
                                    color: '#20304F',
                                  }}>
                                  שעות קבלה:
                                </Text>

                                <TextInput
                                  value={input.start_time}
                                  onChangeText={text => {
                                    input.start_time = text;
                                    setdummyState(dummyState + 1);
                                    console.log(text);
                                  }}
                                  //  value={i.start_time}
                                  style={{
                                    height: verticalScale(46),
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: moderateScale(6),
                                    marginLeft: '3%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    borderColor: '#C7CEDE',
                                    borderWidth: 0.5,
                                    width: '20%',
                                    fontSize: RFValue(16),
                                    fontFamily: 'IBMPlexSansHebrew-Regular',
                                    color: '#5E6167',
                                  }}
                                />

                                <View style={{marginLeft: '2%'}}>
                                  <Text
                                    style={{
                                      fontSize: 24,
                                      fontFamily: 'IBMPlexSansHebrew-Bold',
                                      color: 'black',
                                      marginLeft: '3%',
                                    }}>
                                    -
                                  </Text>
                                </View>
                                <TextInput
                                  value={input.end_time}
                                  onChangeText={text => {
                                    input.end_time = text;
                                    setdummyState(dummyState + 1);
                                    console.log(text);
                                  }}
                                  // onChangeText={text => inputHandler(text, key)}
                                  //  value={i.start_time}
                                  style={{
                                    height: verticalScale(46),
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: moderateScale(6),
                                    width: '20%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    borderColor: '#C7CEDE',
                                    borderWidth: 0.5,
                                    marginLeft: '3%',
                                    fontSize: RFValue(16),
                                    fontFamily: 'IBMPlexSansHebrew-Regular',
                                    color: '#5E6167',
                                  }}
                                />
                                <View
                                style={{width:10}}
                                />

                                <TouchableOpacity
                                  onPress={addHandler}
                                  style={{
                                    height: verticalScale(32),
                                    width: scale(32),
                                    borderRadius: moderateScale(16),
                                    backgroundColor: '#C7CEDE',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginLeft: '1%',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 24,
                                      fontFamily: 'IBMPlexSansHebrew-Bold',
                                      color: 'black',
                                      textAlign: 'center',
                                      marginTop: -5,
                                    }}>
                                    +
                                  </Text>
                                </TouchableOpacity>
                                {key !== 0 && (
                                  <TouchableOpacity
                                    onPress={() => deleteHandler(key, index)}
                                    style={{
                                      height: verticalScale(32),
                                      width: scale(32),
                                      borderRadius: moderateScale(16),
                                      backgroundColor: '#C7CEDE',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    
                                    }}>
                                    <Text
                                      style={{
                                        marginTop: -5,
                                        fontSize: 24,
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                            color: 'black',
                                      }}>
                                      -
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                            
                              <View style={{marginTop: '5%'}}>
                              <Text
                                style={{
                                  fontSize: RFValue(13),
                                  opacity: 0.5,
                                  color: '#20304F',
                                  textAlign: 'left',
                                  fontFamily: 'IBMPlexSansHebrew-Bold',
                                  //  fontFamily: 'IBMPlexSansHebrew-Bold ',
                                }}>
                                שירותים לחלון זמנים
                              </Text>
                            </View>
                              
                              
                              <View
                                style={{
                                  flexWrap: 'wrap',
                                  flexDirection: 'row',
                                  width: '100%',
                                }}>
                                {input.services.map((item, serindex) => {
                                  let value = item.isselected;
                                  return (
                                    <View
                                      style={{
                                        width: '50%',
                                        flexDirection: 'row',
                                        padding: '5%',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                      }}>
                                      <TouchableOpacity
                                        onPress={() =>
                                          onPressItem(
                                            index,
                                            key,
                                            item,
                                            serindex,
                                            value,
                                          )
                                        }
                                        style={{
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          height: verticalScale(36),
                                          width: scale(36),
                                          borderRadius: moderateScale(18),
                                          borderWidth: 1,
                                          borderColor: '#C7CEDE',
                                          backgroundColor: item.isselected
                                            ? '#C7CEDE'
                                            : '#F5F5F5',
                                        }}>
                                        {item.isselected ? (
                                          <Icon
                                            color="#FFFFFF"
                                            size={30}
                                            name="checkmark-outline"
                                          />
                                        ) : null}
                                      </TouchableOpacity>
                                      <View style={{marginLeft: 10}}>
                                        <Text
                                          style={{
                                            color: '#20304F',
                                            fontFamily:
                                              'IBMPlexSansHebrew-Light',
                                            fontSize: 15,
                                          }}>
                                          {item.name}
                                        </Text>
                                      </View>
                                    </View>
                                  );
                                })}
                                 {
                          input.services.length===0&&

                          <View>
                            <Text style={{   
                              color: '#20304F',
                              opacity:0.5,
                                            fontFamily:
                                              'IBMPlexSansHebrew-Bold',
                                            fontSize: 15,}}>
                            עדיין לא יצרת שירותים‎

                            </Text>
                            </View>
                        } 
                              </View>
                            </View>
                          );
                        })}
                      <View style={{marginTop:'5%'}}>
                        {item.timing.length>0&&
                                   <Button
                                   onPress={
                                     apiData.length>0?
                                     save1:
                                     save
                                   }
                                   text='שמירה
                     '
                                   style={{width:'30%',height:30,marginLeft:'35%'}}
                                 />
                        }
                        </View>
             
                      </View>
                    )}
                    <View
                      style={{
                        marginTop: 10,
                        height: 1,
                        backgroundColor: '#C7CEDE',
                      }}
                    />
                    
                      
                  </View>
                );
              })}
            
            
       
        
          </View>
        )}
      </ScrollView>
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
export default DaysScreen;
