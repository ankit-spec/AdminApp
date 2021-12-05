//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import HomeHeader from '../../components/Header/HomeHeader';
import * as Animatable from 'react-native-animatable';
import {colors} from '../../styles/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import Whiteprofile from '../../assets/icons/Whiteprofile.svg';
import {
  moderateScale,
  verticalScale,
  scale,
} from '../../styles/responsiveStyles';
import CalendarIcon from '../../assets/icons/calendar.svg';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {windowWidth} from '../../utils/measurement';
import ThreeDots from '../../assets/icons/threedots.svg';
import Modal from 'react-native-modal';
import Imag from '../../assets/icons/image.svg';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {androidCameraPermission} from '../../../permissions';
import {UPDATE_BUSSINESS_COVER} from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showError } from '../../utils/helperFunction';
import { SafeAreaView } from 'react-native-safe-area-context';

androidCameraPermission;

const DATA = [
    {
      id: 0,
      color: 'green',
      namee: 'מניקור',
      address: 'ראשון 10/10/21 בשעה 11:30',
      person: 'נועה מאיר',
    },
    {
      id: 1,
      color: 'green',
      namee: 'מניקור',
      address: 'ראשון 10/10/21 בשעה 11:30',
      person: 'נועה מאיר',
    },
    {
      id: 2,
      color: '#20304F',
      namee: 'מניקור',
      address: 'ראשון 10/10/21 בשעה 11:30',
      person: 'נועה מאיר',
    },
    {
      id: 3,
      color: '#00000010',
      namee: 'מניקור',
      address: 'ראשון 10/10/21 בשעה 11:30',
      person: 'נועה מאיר',
    },
    {
      id: 4,
      color: '#00000010',
      namee: 'מניקור',
      address: 'ראשון 10/10/21 בשעה 11:30',
      person: 'נועה מאיר',
    },
  ],
  DATA1 = [
    {
      id: 0,
      number: '934',
      namee: 'רשומים לעסק',
    },
    {
      id: 1,
      number: '316',
      namee: 'תורים החודש',
    },
    {
      id: 1,
      number: '316',
      namee: 'תורים היום',
    },
  ];

const DashboardScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [cover, setcover] = useState('');
  const [cover1, setcover1] = useState('');
  const idd = useSelector(state => state.auth.id);
const logoImage=useSelector(state=>state.authEmployee.bussinessImage)
const coverImage=useSelector(state=>state.authEmployee.bussinesscover)
const namee=useSelector(state=>state.authEmployee.name)
console.log(coverImage,'logoImage')
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Gallery', onPress: onGallery1},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };
  const onGallery1 = () => {
    ImagePicker.openPicker({
     disableCropperColorSetters:true,
      includeBase64: true,
      avoidEmptySpaceAroundImage:true,
      mediaType:'photo',
      compressImageQuality:1	,
      freeStyleCropEnabled:true,
      cropping:true,
      showCropFrame:false
    }).then(imageee => {
      setcover(imageee.path);
      setcover1(imageee.data);
      imageUpload(cover1,idd)

      // console.log(cover1, '.....');
    });
  };

  const imageUpload = async data => {
    console.log(data, 'dats');

    const value = await AsyncStorage.getItem('@storage_Key');
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', Authorization: value},
      body: JSON.stringify({
        file:`data:image/png;base64,${cover1}`,
        id:idd,
      }),
    };

    fetch(UPDATE_BUSSINESS_COVER, requestOptions)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, ';;;;');
        
      })
   .catch(
   
  //  showError('Something went wrong!')
   )
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={false}
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />
      <ScrollView>
        <Modal isVisible={isModalVisible}>
          <View style={{flex: 1}}>
            <Text>Hello!</Text>

            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>
        <Animatable.View animation="fadeInDownBig">
          
          <ImageBackground
           
            resizeMode='cover'
            imageStyle={{
              borderBottomLeftRadius: moderateScale(20),
              borderBottomRightRadius: moderateScale(20),
            }}
            style={{marginTop: '10%',width:'100%'}}
            source={
              cover === ''
                ? {uri:`http://18.159.82.242/v1/uploads/${coverImage}`}
                : {uri: cover}
            }
            >
           <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',marginHorizontal:'5%'}}>
            <View
              style={{
                marginTop: '50%',
                backgroundColor: 'white',
            
                height: verticalScale(36),
               
                borderRadius: moderateScale(23),
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '5%',
            
              }}>
                <View>
                <View style={{flexDirection:'row'}}>
              <View
                style={{
                  height: verticalScale(32),
                  width:scale(32),
                  backgroundColor: colors.THEME,
                  borderRadius: moderateScale(16),
                  marginLeft: '2%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Whiteprofile />
              </View>
              <View style={{alignItems:'center',justifyContent:'center'}}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Regular',
                  color: '#5E6167',
                  marginLeft: '4%',
                  textAlign:'center'
                }}>
              שלום {namee}
              </Text>
              </View>
              </View>
              </View>
              </View>
              <TouchableOpacity
                onPress={onSelectImage}
                style={{
                
                  height: verticalScale(36),
                  width: scale(36),
                  borderRadius: moderateScale(36 / 2),
                  backgroundColor: 'white',
                  marginTop: '50%',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
                <Imag />
              </TouchableOpacity>
          </View>
          </ImageBackground>
          <View style={styles.nextAppointment}>
            <View>
              <Text style={styles.nextAppointmentStyle}>רשימת תורים</Text>
            </View>
            <View
              style={{
                width: scale(81),
                backgroundColor: '#C7CEDE',

                height: verticalScale(36),

                borderRadius: moderateScale(23),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Bold',
                  color: '#20304F',
                  marginLeft: '19%',
                }}>
                היום
              </Text>
              <TouchableOpacity style={{marginLeft: '11%'}}>
                <CalendarIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: '4%',
              marginHorizontal: '8%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{height: verticalScale(45), width: scale(45)}}
            //  source={{uri:`http://18.159.82.242/v1/uploads/${logoImage}`}}
             source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
            />
            <Text
              style={{
                fontSize: RFValue(18),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                marginLeft: '2%',
                color: '#20304F',
              }}>
              לודמילה
            </Text>
            <View
              style={{
                height: verticalScale(28),
                width: scale(28),
                backgroundColor: '#C7CEDE',
                borderRadius: moderateScale(28 / 2),
                marginLeft: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Regular',
                  color: '#20304F',
                }}>
                9
              </Text>
            </View>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <View style={styles.containerr}>
                  <View
                    style={{flexDirection: 'row', marginTop: '6%', flex: 1}}>
                    <View style={{flex: 0.1}}>
                      <View
                        style={[
                          styles.rightBar,
                          {backgroundColor: item.color},
                        ]}></View>
                    </View>
                    <View style={{flex: 0.85, marginTop: '2%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: RFValue(18),

                            color: '#5E6167',
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                          }}>
                          {item.namee}
                        </Text>
                        <View style={{marginLeft: -50}}>
                          <ThreeDots />
                        </View>
                      </View>
                      <Text
                        style={{
                          marginRight: '19%',
                          fontSize: RFValue(14),
                          marginTop: '3%',
                          fontFamily: 'IBMPlexSansHebrew-Regular',
                          color: '#A3A4A8',
                        }}>
                        {item.address}
                      </Text>
                      <View
                        style={{
                          marginTop: '5%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{
                              width: scale(36),
                              height: verticalScale(36),
                            }}
                            source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
                          />
                          <Text style={{marginLeft: '5%'}}>{item.person}</Text>
                        </View>
                        <View style={{marginLeft: '65%'}}></View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <View
            style={{
              marginTop: '4%',
              marginHorizontal: '8%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{height: verticalScale(45), width: scale(45)}}
              source={require('../../assets/icons/ProfileIcon2/ProfileIcon2.2.png')}
            />
            <Text
              style={{
                fontSize: RFValue(18),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                marginLeft: '2%',
                color: '#20304F',
              }}>
              לודמילה
            </Text>
            <View
              style={{
                height: verticalScale(28),
                width: scale(28),
                backgroundColor: '#C7CEDE',
                borderRadius: moderateScale(28 / 2),
                marginLeft: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Regular',
                  color: '#20304F',
                }}>
                9
              </Text>
            </View>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <View style={styles.containerr}>
                  <View
                    style={{flexDirection: 'row', marginTop: '6%', flex: 1}}>
                    <View style={{flex: 0.1}}>
                      <View
                        style={[
                          styles.rightBar,
                          {backgroundColor: item.color},
                        ]}></View>
                    </View>
                    <View style={{flex: 0.85, marginTop: '2%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: RFValue(18),

                            color: '#5E6167',
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                          }}>
                          {item.namee}
                        </Text>
                        <View style={{marginLeft: -50}}>
                          <ThreeDots />
                        </View>
                      </View>
                      <Text
                        style={{
                          marginRight: '19%',
                          fontSize: RFValue(14),
                          marginTop: '3%',
                          fontFamily: 'IBMPlexSansHebrew-Regular',
                          color: '#A3A4A8',
                        }}>
                        {item.address}
                      </Text>
                      <View
                        style={{
                          marginTop: '5%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{
                              width: scale(36),
                              height: verticalScale(36),
                            }}
                            source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
                          />
                          <Text style={{marginLeft: '5%'}}>{item.person}</Text>
                        </View>
                        <View style={{marginLeft: '65%'}}></View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <View
            style={{
              marginTop: '4%',
              marginHorizontal: '8%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{height: verticalScale(45), width: scale(45)}}
              source={require('../../assets/icons/ProfileIcon2/ProfileIcon2.2.png')}
            />
            <Text
              style={{
                fontSize: RFValue(18),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                marginLeft: '2%',
                color: '#20304F',
              }}>
              לודמילה
            </Text>
            <View
              style={{
                height: verticalScale(28),
                width: scale(28),
                backgroundColor: '#C7CEDE',
                borderRadius: moderateScale(28 / 2),
                marginLeft: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  fontFamily: 'IBMPlexSansHebrew-Regular',
                  color: '#20304F',
                }}>
                9
              </Text>
            </View>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <View style={styles.containerr}>
                  <View
                    style={{flexDirection: 'row', marginTop: '6%', flex: 1}}>
                    <View style={{flex: 0.1}}>
                      <View
                        style={[
                          styles.rightBar,
                          {backgroundColor: item.color},
                        ]}></View>
                    </View>
                    <View style={{flex: 0.85, marginTop: '2%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: RFValue(18),

                            color: '#5E6167',
                            fontFamily: 'IBMPlexSansHebrew-Bold',
                          }}>
                          {item.namee}
                        </Text>
                        <View style={{marginLeft: -50}}>
                          <ThreeDots />
                        </View>
                      </View>
                      <Text
                        style={{
                          marginRight: '19%',
                          fontSize: RFValue(14),
                          marginTop: '3%',
                          fontFamily: 'IBMPlexSansHebrew-Regular',
                          color: '#A3A4A8',
                        }}>
                        {item.address}
                      </Text>
                      <View
                        style={{
                          marginTop: '5%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{
                              width: scale(36),
                              height: verticalScale(36),
                            }}
                            source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
                          />
                          <Text style={{marginLeft: '5%'}}>{item.person}</Text>
                        </View>
                        <View style={{marginLeft: '65%'}}></View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <View
            style={{
              height: verticalScale(130),
              backgroundColor: '#20304F',
              borderTopLeftRadius: moderateScale(20),
              borderTopRightRadius: moderateScale(20),
            }}>
            <View
              style={{
                marginTop: '0%',
                marginHorizontal: '12%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <View style={{width: '65%'}}>
                  <Text
                    style={{
                      fontSize: RFValue(24),
                      color: 'white',
                      alignItems: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Bold',
                    }}>
                    934
                  </Text>
                </View>
                <View style={{width: '60%'}}>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Regular',
                    }}>
                    תורים היום
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: verticalScale(73),
                  backgroundColor: 'grey',
                  width: 1,
                  margin: 15,
                }}></View>
              <View
                style={{
                  height: verticalScale(73),
                  width: 1,
                  margin: 10,
                }}></View>
              <View>
                <View style={{width: '65%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(24),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Bold',
                    }}>
                    934
                  </Text>
                </View>
                <View style={{width: '60%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Regular',
                    }}>
                    תורים היום
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: verticalScale(73),
                  backgroundColor: 'grey',
                  width: 1,
                  margin: 15,
                }}></View>
              <View
                style={{
                  height: verticalScale(73),
                  width: 1,
                  margin: 10,
                }}></View>
              <View>
                <View style={{width: '60%', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: RFValue(24),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Bold',
                    }}>
                    934
                  </Text>
                </View>
                <TouchableOpacity onPress={imageUpload} style={{width: '60%'}}>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'IBMPlexSansHebrew-Regular',
                    }}>
                    רשומים לעסק
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View style={{width: '15%',margin:20}}>
                <Text style={{fontSize: RFValue(24), color: 'white'}}>934</Text>
                <Text style={{fontSize: RFValue(16), color: 'white'}}>
                  רשומים לעסק
                </Text>
              </View> */}
              {/* <View style={{height:verticalScale(73),backgroundColor:'grey',width:1,margin:15}}>
                  </View>
              <View style={{width: '15%',margin:20}}>
                <Text style={{fontSize: RFValue(24), color: 'white'}}>934</Text>
                <Text style={{fontSize: RFValue(16), color: 'white'}}>
                  רשומים לעסק
                </Text>
              </View> */}
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  nextAppointment: {
    marginTop: '3%',
    flexDirection: 'row',
    marginHorizontal: '8%',
    justifyContent: 'space-between',
  },
  nextAppointmentStyle: {
    fontSize: RFValue(24),
    textAlign: 'left',
    color: '#20304F',
    // fontWeight: 'bold',

    fontFamily: 'IBMPlexSansHebrew-Bold',
  },
  containerr: {
    backgroundColor: '#ffffff',
    height: moderateScale(141),
    marginHorizontal: moderateScale(30),
    width: (windowWidth * 85) / 100,
    alignSelf: 'center',
    marginTop: '2%',
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    flex: 1,
  },

  rightBar: {
    width: '20%',
    height: '85%',

    alignSelf: 'center',
    borderRadius: 20,
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
});

//make this component available to the app
export default DashboardScreen;
