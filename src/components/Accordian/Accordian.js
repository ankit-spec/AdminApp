import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  Switch,
  FlatList,
} from 'react-native';

import {windowHeight, windowWidth} from '../../utils/measurement';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale, verticalScale} from '../../styles/responsiveStyles';
import {RFValue} from 'react-native-responsive-fontsize';
import {scale} from '../../styles/responsiveStyles';
import {TextInput} from 'react-native-gesture-handler';
import CheckMark from '../../assets/checkmark.svg';

export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: true,
      isEnabled1: false,
      data: [
        {
          id: 0,
          service: 'ג’ל רגיל',
          isselected: false,
        },
        {
          id: 1,
          service: 'מניקור',
          isselected: false,
        },
        {
          id: 2,
          service: 'ג’ל פרנץ’',
          isselected: false,
        },

        {
          id: 3,
          service: 'פדיקור',
          isselected: false,
        },
    
      ],
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  onPressItem = (item, ind) => {
    let arr = this.state.data.map((item, index) => {
      if (ind === index) {
        item.isselected = !item.isselected;
      }
      return {...item};
    });

    //console.log(newArr,'newarr')

    this.setState({
      data: arr,
    });
  };

  render() {
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
              //  fontFamily: 'IBMPlexSansHebrew-Bold',
                color: '#20304F',
              }}>
              {this.props.title}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Switch
                style={{borderRadius: 10}}
                trackColor={{false: '#767577', true: '#B1DBA6'}}
                thumbColor={'white'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch1}
                value={this.state.isEnabled1}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.toggleExpand()}
              style={{marginLeft: 10}}
             >
              {this.state.expanded ? (
                <Icon size={18} color="#5E6167" name="chevron-up-outline" />
              ) : (
                <Icon size={18} color="#5E6167" name="chevron-down-outline" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {this.state.expanded && (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 5,
              paddingBottom: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: RFValue(15),
                 // fontFamily: 'IBMPlexSansHebrew-Light',
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
                  style={{
                    height: verticalScale(46),
                    backgroundColor: '#FFFFFF',
                    borderRadius: moderateScale(6),
                    width: scale(80),
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    borderColor: '#C7CEDE',
                    borderWidth: 0.5,
                  }}
                />
              </View>
              <View style={{marginLeft: '2%'}}>
                <Text
                  style={{
                    fontSize: 30,
                   // fontFamily: 'IBMPlexSansHebrew-Regular',
                    color: '#5E6167',
                  }}>
                  -
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '5%',
                }}>
                <TextInput
                  style={{
                    height: verticalScale(46),
                    backgroundColor: '#FFFFFF',
                    borderRadius: moderateScale(6),
                    width: scale(80),
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    borderColor: '#C7CEDE',
                    borderWidth: 0.5,
                  }}
                />
              </View>
            </View>
            <View style={{marginTop: '5%'}}>
              <Text
                style={{
                  fontSize: RFValue(13),
                  opacity: 0.5,
                  color: '#20304F',
                //  fontFamily: 'IBMPlexSansHebrew-Bold ',
                }}>
                שירותים לחלון זמנים
              </Text>
            </View>
            <View>
              <FlatList
                numColumns={2}
                data={this.state.data}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: '5%',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => this.onPressItem(item, index)}
                        style={{
                          height: verticalScale(36),
                          width: scale(32),
                          borderRadius: moderateScale(16),
                          borderWidth: 1,
                          borderColor: '#C7CEDE',
                          backgroundColor: item.isselected
                            ? '#C7CEDE'
                            : '#F5F5F5',
                        }}>
                            {item.isselected?
                        <Icon
                        color='#FFFFFF'
                        size={30}
                        name='checkmark-outline'
                        />:
                        null    
                        }
                        </TouchableOpacity>
                      <View style={{marginLeft: 10}}>
                        <Text>{item.service}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        )}
        <View style={{marginTop: 10, height: 1, backgroundColor: '#C7CEDE'}} />
      </View>
    );
  }

  toggleSwitch1 = () => {
    this.setState({
      isEnabled1: !this.state.isEnabled1,
    });
    console.log(this.state.data,'data')
  };

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
  },
  parentHr: {
    height: 1,

    width: '100%',
  },
  child: {
    padding: 16,
  },
  container: {
    backgroundColor: '#ffffff',
    // height: moderateScale(200),
    marginHorizontal: moderateScale(30),
    width: (windowWidth * 83) / 100,
    alignSelf: 'center',
    marginTop: '7%',
    borderRadius: moderateScale(20),
    /// flexDirection: 'row',
    flex: 1,
    // backgroundColor:'red'
  },
  containerr: {
    // height: moderateScale(170),
  },

  rightBar: {
    width: '20%',
    height: Platform.OS === 'android' ? verticalScale(120) : verticalScale(100),

    alignSelf: 'center',
    borderRadius: 20,
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
});
