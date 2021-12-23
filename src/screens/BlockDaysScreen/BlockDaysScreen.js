import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  UIManager,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {windowWidth} from '../../utils/measurement';
import {colors} from '../../styles/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import Add from '../../assets/icons/Add.svg';
import {
  verticalScale,
  moderateScale,
  scale,
} from '../../styles/responsiveStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Modal from 'react-native-modal';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Accordian from '../../components/Accordian/Accordian';
import Delete from '../../assets/trash.svg';
import {BLOCK_DATE, UPDATE_BLOCK_DATE} from '../../config/config';
import {showSuccess} from '../../utils/helperFunction';
const BlockDaysScreen = ({navigation, route}) => {
  const empId = route.params.importid;
  console.log(empId, 'empId');
  const [modalVisible, setmodalVisible] = useState(false);
  const [date, setdate] = useState(null);
  const [markedDates, setmarkedDates] = useState(null);
  const [currTime, setcurrTime] = useState(moment().format('YYYY-MM-DD'));
  const [comingDate, setcomingDate] = useState(null);
  const [days, setdays] = useState('');
  const [expanded, setexpanded] = useState(true);
  const [inputlist, setinputlist] = useState([{start_time: '', end_time: ''}]);
  const [dummyState, setdummyState] = useState(0);
  const [loading, setloading] = useState(false);
  const [apiData, setapiData] = useState([]);
  const [select, setSelect] = useState(null);
  const [profile, setProfile] = useState(route.params.image12);

  useEffect(() => {
    const unsubscribeNavigationFocus = navigation.addListener(
      'focus',
      async () => {
        try {
          setloading(true);
          setTimeout(() => {
            getSchedule();
          }, 1000);
          setloading(false);
        } catch (error) {
          console.log('inside error');
          console.log(error);
        } finally {
        }
      },
    );

    return unsubscribeNavigationFocus;
  }, [loading, expanded, navigation]);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const addHandler = () => {
    const _inputs = [...inputlist];
    _inputs.push({end_time: '', start_time: ''});
    setinputlist(_inputs);
  };

  const addHandler1 = ind => {
    console.log(ind, ';;');
    apiData.map((item, index) => {
      item.timing.push({end_time: '', start_time: ''});

      console.log(JSON.stringify(apiData, '[[['));
      setdummyState(dummyState + 1);
    });
  };

  const deleteHandler = (key, index) => {
    // console.log(inputlist, 'input');
    // const _inputs = inputlist.filter((input, index) => index != key);
    // setinputlist(_inputs);
    const abcd = apiData[index].timing.splice(key, 1);
    //  console.log(abcd, 'ppppppp');
    setdummyState(dummyState - 1);
  };

  const deleteHandler1 = key => {
    // console.log(inputlist, 'input');
    const _inputs = inputlist.filter((input, index) => index != key);
    setinputlist(_inputs);
    // const abcd = inputlist[key].timing.splice(key, 1);
    //  console.log(abcd, 'ppppppp');
    setdummyState(dummyState - 1);
  };

  const inputHandler = (text, key) => {
    const _inputs = [...inputlist];
    _inputs[key].start_time = text;

    _inputs[key].key = key;
    setinputlist(_inputs);
  };

  const inputHandler1 = (text, key) => {
    const _inputs = [...inputlist];
    _inputs[key].end_time = text;

    _inputs[key].key = key;
    setinputlist(_inputs);
  };

  const modalEvent = () => {
    setmodalVisible(true);
  };
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded(!expanded);
  };

  const monthNames = [
    'ינואר',
    ' פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ];
  const showModal = () => {
    return (
      <Modal
        backdropColor={'rgba(0,0,0,0.80)'}
        backdropOpacity={1}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={3000}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        isVisible={modalVisible}
        onBackButtonPress={() => setmodalVisible(false)}
        onBackdropPress={() => setmodalVisible(false)}
        style={{
          backgroundColor: 'white',
          marginTop: '70%',
          height: verticalScale(30),
          marginBottom: '90%',
          marginHorizontal: '5%',
          borderRadius: moderateScale(20),
        }}>
        <View style={{flex: 1, height: verticalScale(30)}}>
          <Calendar
            locales={
              ((LocaleConfig.locales['he'] = {
                monthNames: [
                  'ינואר',
                  ' פברואר',
                  'מרץ',
                  'אפריל',
                  'מאי',
                  'יוני',
                  'יולי',
                  'אוגוסט',
                  'ספטמבר',
                  'אוקטובר',
                  'נובמבר',
                  'דצמבר',
                ],
                monthNamesShort: [
                  'ינואר',
                  ' פברואר',
                  'מרץ',
                  'אפריל',
                  'מאי',
                  'יוני',
                  'יולי',
                  'אוגוסט',
                  'gfghfhh',
                  'אוקטובר',
                  'נובמבר',
                  'דצמבר',
                ],
                dayNames: [
                  'יום רשון',
                  'יום שיני',
                  'יום שלישי',
                  'יום רביעי',
                  'יוםחמישי',
                  'יוםששי',
                  'שבת',
                ],
                dayNamesShort: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
              }),
              (LocaleConfig.defaultLocale = 'he'))
            }
            current={date}
            minDate={new Date()}
            onDayPress={day => {
              setmarkedDates(day.dateString);
              setmodalVisible(false);
              setdays(day.dateString);
              setexpanded(true);
              // setdays(days.concat(day.dateString))
            }}
            markedDates={{
              [markedDates]: {
                selected: true,
                disableTouchEvent: true,
              },
            }}
            renderArrow={direction => {
              if (direction === 'left') {
                if (comingDate != null && comingDate != currTime) {
                  return <Icon name="chevron-forward-outline" size={25} />;
                }
              }
              if (direction === 'right') {
                return <Icon name="chevron-back-outline" size={25} />;
              }
            }}
            style={[styles.calendar, {height: 300, borderRadius: 20}]}
            theme={{
              backgroundColor: '#ffffff',
              textSectionTitleColor: 'black',
              selectedDayBackgroundColor: '#C7CEDE',
              selectedDayTextColor: 'black',
              dayTextColor: 'red',
              arrowColor: '#C7CEDE',
              monthTextColor: '#C7CEDE',
              //  textDayFontFamily: 'IBMPlexSansHebrew-Regular',
              //  textDayStyle: {color: '#5E6167', opacity: 1},
              // textDayFontSize: RFValue(14),
              textMonthFontFamily: 'IBMPlexSansHebrew-Bold',
              todayTextColor: '#C7CEDE',
              todayBackgroundColor: '#F5E5DD',
              textDayHeaderFontFamily: 'IBMPlexSansHebrew-Bold',

              textMonthFontSize: RFValue(14),
              dayTextColor: 'black',
              textSectionTitleDisabledColor: '#d9e1e8',
              'stylesheet.calendar.main': {
                dayContainer: {
                  borderColor: '#D1D3D4',
                  margin: 0,
                  padding: 0,
                  height: 20,
                },
              },
              'stylesheet.day.period': {
                base: {
                  overflow: 'hidden',
                  height: 34,
                  alignItems: 'center',
                  width: 38,
                },
              },

              emptyDayContainer: {
                borderColor: '#D1D3D4',
                borderWidth: 1,
                flex: 1,
                padding: 50,
                height: 50,
                marginHorizontal: 20,
                marginTop: 20,
              },
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                },
                month: {
                  marginTop: 30,
                },
              },
            }}
            // renderArrow={direction => (direction.left ? <Dropdownss /> : null)}
            renderHeader={date => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      marginLeft: 5,
                      height: 30,
                      width: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: moderateScale(5),
                      backgroundColor: '#F5E5DD',
                    }}>
                    <Text
                      style={{
                        color: '#CB7E58',
                        fontSize: RFValue(14),
                        fontFamily: 'IBMPlexSansHebrew-Bold',
                      }}>
                      {monthNames[date.getMonth()]}
                    </Text>
                  </View>
                  <View style={{marginLeft: 20}}>
                    <Text
                      style={{
                        color: '#5E6167',
                        fontSize: RFValue(14),
                        // fontFamily: 'IBMPlexSansHebrew-Regular',
                      }}>
                      {' '}
                      {date.getFullYear()}
                    </Text>
                  </View>
                </View>
              );
            }}
            disabledDaysIndexes={[6, 5]}
          />
        </View>
      </Modal>
    );
  };

  const saveBlockDays = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body: JSON.stringify({
        employeeId: empId,
        date: days,
        timing: inputlist,
      }),
    };
    setloading(true);
    fetch(BLOCK_DATE, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, ';;;;');
        showSuccess('Schedule saved');
        setexpanded(false);
        getSchedule();
        setloading(false);
      })
      .catch(error => {
        console.log(error);

        showError('Something went wrong!');
      });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const getSchedule = async () => {
    const value = await AsyncStorage.getItem('@storage_Key');
    setloading(true);
    fetch(`http://18.159.82.242/v1/schedule/get_blockDates/${empId}`, {
      headers: {Authorization: value},
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log('===>>>', JSON.stringify(data.data));
        setapiData(data.data);
        setloading(false);
        // setresult(data)
        // setApiData(data.data.days);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteDays = async select => {
    console.log(select._id, 'sek');

    const value = await AsyncStorage.getItem('@storage_Key');

    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body:JSON.stringify({
        id:select._id
      })
    };
setloading(true)
    fetch(
      `http://18.159.82.242/v1/schedule/block_dates_delete/${select._id}`,
      requestOptions,
    )
      .then(resp => {
        return resp.json();
      })
      .then(responseJson => {
        console.log(responseJson, ';;;;');
        getSchedule()
        setloading(false)
      })
      .catch(error => {
        console.log(error);

        showError('Something went wrong!');
      });
  };

  const updateBlockedDays = async select => {
    console.log(select);

    const value = await AsyncStorage.getItem('@storage_Key');

    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body: JSON.stringify({
        id: select._id,
        employeeId: empId,
        date: select.date,
        timing: select.timing,
      }),
    };
    setloading(true);

    fetch(UPDATE_BLOCK_DATE, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, ';;;;');
        showSuccess('Schedule saved');
        getSchedule();
        setloading(false);
        // setexpanded(false);
      })
      .catch(error => {
        console.log(error);

        showError('Something went wrong!');
      });
  };
  return (
    <View style={styles.container}>
       <View style={styles.myAppointmentsHeader}>
        <View style={{marginTop: '16%', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: RFValue(18),
              color: '#FFFFFF',
              fontFamily: 'IBMPlexSansHebrew-Bold',
              fontFamily: 'IBMPlexSansHebrew-Bold',
            }}>
              תאריכים חסומים
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => modalEvent()}
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
          zIndex: 9999,
          right: 40,
          overflow: 'hidden',
          zIndex: 99999,
        }}>
        <Add />
      </TouchableOpacity>
      <ScrollView style={{flex: 1, paddingBottom: '10%'}}>
        <View
          style={{
            marginTop: '5%',
            flexDirection: 'row',
            marginHorizontal: '10%',
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
                ? require('../../assets/icons/profile/profile.png')
                : route.params.image11 !== ''
                ? {
                    uri: `http://18.159.82.242/v1/uploads/${route.params.image11}`,
                  }
                : {
                    uri: `http://18.159.82.242/v1/uploads/${route.params.image12}`,
                  }
            }
          />
          <Text
            style={{
              marginLeft: '5%',
              fontSize: RFValue(18),
              fontFamily: 'IBMPlexSansHebrew-Bold',
              color: '#5E6167',
            }}>
            {route.params.emplName}
          </Text>
        </View>
        {loading ? (
          <View>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <View style={{marginTop: '8%'}}>
            {apiData.map((i, index) => {
              return (
                <View style={{margin: '2%'}}>
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: '10%',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: '#20304F',
                        fontFamily: 'IBMPlexSansHebrew-Bold',
                        fontSize: RFValue(16),
                      }}>
                      יום ראשון {moment(i.date).format('DD-MM-YYYY')}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        deleteDays(i);
                      }}>
                      <Delete />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: '5%'}}>
                    {i.timing.map((input, key) => {
                      return (
                        <View
                          key={key}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: '10%',
                            margin: '3%',
                          }}>
                          <Text
                            style={{
                              fontSize: RFValue(15),
                              fontFamily: 'IBMPlexSansHebrew-Light',
                              color: '#20304F',
                            }}>
                            שעות קבלה:
                          </Text>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: '5%',
                            }}>
                            <TextInput
                              value={input.start_time}
                              onChangeText={text => {
                                input.start_time = text;
                                setdummyState(dummyState + 1);
                                console.log(text);
                              }}
                              style={{
                                height: verticalScale(46),
                                backgroundColor: '#FFFFFF',
                                borderRadius: moderateScale(6),
                                width: scale(60),
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                borderColor: '#C7CEDE',
                                borderWidth: 0.5,
                                fontSize: RFValue(14),
                                fontFamily: 'IBMPlexSansHebrew-Regular',
                                color: '#5E6167',
                              }}
                            />
                          </View>

                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: '5%',
                            }}>
                            <TextInput
                              value={input.end_time}
                              onChangeText={text => {
                                input.end_time = text;
                                setdummyState(dummyState + 1);
                                console.log(text);
                              }}
                              style={{
                                height: verticalScale(46),
                                backgroundColor: '#FFFFFF',
                                borderRadius: moderateScale(6),
                                width: scale(60),
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                borderColor: '#C7CEDE',
                                borderWidth: 0.5,
                                fontSize: RFValue(14),
                                fontFamily: 'IBMPlexSansHebrew-Regular',
                                color: '#5E6167',
                              }}
                            />
                          </View>
                          <View style={{width: '3%'}} />

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
                                fontSize: 24,

                                marginTop: -5,
                                fontFamily: 'IBMPlexSansHebrew-Bold',
                                color: 'black',
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
                                marginLeft: '5%',
                              }}>
                              <Text
                                style={{
                                  fontSize: 24,

                                  marginTop: -5,
                                  fontFamily: 'IBMPlexSansHebrew-Bold',
                                  color: 'black',
                                }}>
                                -
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })}
                  </View>
                  <TouchableOpacity
                    onPress={() => updateBlockedDays(i)}
                    style={{
                      height: 40,
                      backgroundColor: '#C7CEDE',
                      marginHorizontal: '40%',
                      marginTop: '5%',
                      borderRadius: moderateScale(5),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(14),
                        fontFamily: 'IBMPlexSansHebrew-Regular',
                        fontFamily: 'IBMPlexSansHebrew-Bold',
                      }}>
                       השמירה
                    </Text>
                  </TouchableOpacity>
                  <View
                      style={{
                        marginTop: 10,
                        height: 1,
                        backgroundColor: '#C7CEDE',
                        marginHorizontal:'5%'
                      }}
                    />
                </View>
              );
            })}
            {expanded === true && (
              <View>
                <View style={{marginTop: '1%'}}>
                  {days !== '' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: '10%',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#20304F',
                          fontFamily: 'IBMPlexSansHebrew-Bold',
                          fontSize: RFValue(16),
                        }}>
                        {moment(days).format('DD-MM-YYYY')}
                      </Text>
                      <Delete />
                    </View>
                  )}
                </View>
                {days !== '' && (
                  <View style={{marginTop: '5%'}}>
                    {inputlist.map((input, key) => {
                      return (
                        <View>
                          <View
                            key={key}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginHorizontal: '10%',
                              margin:'2%'
                            }}>
                            <Text
                              style={{
                                fontSize: RFValue(15),
                                fontFamily: 'IBMPlexSansHebrew-Light',
                                color: '#20304F',
                              }}>
                              שעות קבלה:
                            </Text>
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: '5%',
                              }}>
                              <TextInput
                                value={input.start_time}
                                onChangeText={text => inputHandler(text, key)}
                                style={{
                                  height: verticalScale(46),
                                  backgroundColor: '#FFFFFF',
                                  borderRadius: moderateScale(6),
                                  width: scale(60),
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  textAlign: 'center',
                                  borderColor: '#C7CEDE',
                                  borderWidth: 0.5,
                                }}
                              />
                            </View>

                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: '5%',
                              }}>
                              <TextInput
                                value={input.end_time}
                                onChangeText={text => inputHandler1(text, key)}
                                style={{
                                  height: verticalScale(46),
                                  backgroundColor: '#FFFFFF',
                                  borderRadius: moderateScale(6),
                                  width: scale(60),
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  textAlign: 'center',
                                  borderColor: '#C7CEDE',
                                  borderWidth: 0.5,
                                }}
                              />
                            </View>
                            <View style={{width: 10}} />

                            <TouchableOpacity
                              onPress={addHandler}
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
                                  fontSize: 24,
                                  fontFamily: 'IBMPlexSansHebrew-Bold',
                                  color: 'black',
                                  marginTop: -5,
                                }}>
                                +
                              </Text>
                            </TouchableOpacity>
                            {key !== 0 && (
                              <TouchableOpacity
                                onPress={() => deleteHandler1(key)}
                                style={{
                                  height: verticalScale(32),
                                  width: scale(32),
                                  borderRadius: moderateScale(16),
                                  backgroundColor: '#C7CEDE',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginLeft:'3%'
                                }}>
                                <Text
                                  style={{
                                    fontSize: 30,
                                    fontFamily: 'IBMPlexSansHebrew-Bold',
                                    color: '#5E6167',
                                    marginTop: -5,
                                  }}>
                                  -
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      );
                    })}
                    <TouchableOpacity
                      onPress={saveBlockDays}
                      style={{
                        height: 30,
                        backgroundColor: '#C7CEDE',
                        marginHorizontal: '40%',
                        marginTop: '5%',
                        borderRadius: moderateScale(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(14),

                          fontFamily: 'IBMPlexSansHebrew-Bold',
                        }}>
               השמירה
                        
                      </Text>
                    </TouchableOpacity>
                      <View
                      style={{
                        marginTop: 10,
                        height: 1,
                        backgroundColor: '#C7CEDE',
                        marginHorizontal:'5%'
                      }}
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>
      {modalVisible && showModal()}
    </View>
  );
};

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

export default BlockDaysScreen;
