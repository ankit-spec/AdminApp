import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {windowWidth} from '../../utils/measurement';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../styles/colors';
import People from '../../assets/icons/people.svg';
import Input from '../../components/Input/Input';
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../styles/responsiveStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
const DATA = [
  {
    id: 0,
    name: 'נועה מאיר',
    number: '0527881472',
  },
  {
    id: 1,
    name: 'נועה מאיר',
    number: '0527881472',
  },
  {
    id: 2,
    name: 'נועה מאיר',
    number: '0527881472',
  },
  {
    id: 3,
    name: 'נועה מאיר',
    number: '0527881472',
  },
  {
    id: 4,
    name: 'נועה מאיר',
    number: '0527881472',
  },
  {
    id: 5,
    name: 'נועה מאיר',
    number: '0527881472',
  },
  {
    id: 6,
    name: 'נועה מאיר',
    number: '0527881472',
  },
];

const AppointmentScreen = () => {
  const token = useSelector(state => state.auth.token);
  console.log(token, 'token');
  const [searchValue, setsearchValue] = useState('');
  const [getCustomer, setgetCustomer] = useState([]);
  const [getCustomer1, setgetCustomer1] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsEntertainment();
    // getText()
  }, []);

  const getNewsEntertainment = () => {
    fetch('http://18.159.82.242/v1/users/get_customer_list?keyword=sample', {
      headers: {Authorization: token},
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log('datharyanaa===>>>', data);
        setgetCustomer(data.data);
        setgetCustomer1(data.data)
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getText = text => {
    setsearchValue(text);
    console.log('text', text);
    const res2 = getCustomer.filter(i =>
      i.name.toLowerCase().includes(text.toLowerCase()),
    );
    console.log('res2', res2);
    setgetCustomer1(res2);

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
              קביעת תור חדש
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: '10%',
          marginHorizontal: '10%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: '#20304F',
              fontFamily: 'IBMPlexSansHebrew-Bold',
              fontSize: RFValue(24),
            }}>
            בחירת לקוח
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: '#20304F',
              fontFamily: 'IBMPlexSansHebrew-Bold',
              fontSize: RFValue(14),
            }}>
            אנשי קשר
          </Text>
          <People />
        </View>
      </View>
      <View style={{height: 20}} />
      <Input
        style={{
          textAlign: 'right',
          fontSize: RFValue(16),
          fontFamily: 'IBMPlexSansHebrew-Regular',
          padding: '3%',
          marginLeft: '3%',
        }}
        value={searchValue}
        onChangeText={text => getText(text)}
        placeholder="חיפוש"
        placeholderTextColor={colors.GREY}
        keyboardType="phone-pad"
      />
      <View style={{marginHorizontal: '10%'}}>
        <FlatList
          data={getCustomer1}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <View style={{padding: '5%'}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      style={{
                        width: scale(46),
                        height:
                          Platform.OS === 'android'
                            ? verticalScale(52)
                            : verticalScale(46),
                        borderRadius: moderateScale(46 / 2),
                      }}
                      source={require('../../assets/icons/profile/profile.png')}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: '5%',
                      // alignItems:'center',

                      //  justifyContent:'center'
                    }}>
                    <View style={{alignItems: 'flex-start'}}>
                      <Text
                        style={{
                          color: '#5E6167',
                          fontSize: RFValue(14),
                          fontFamily: 'IBMPlexSansHebrew-Bold',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#5E6167',
                          fontSize: RFValue(14),
                          fontFamily: 'IBMPlexSansHebrew-Regular',
                        }}>
                        {item.phone}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: '5%',
                    height: 1,
                    backgroundColor: '#C7CEDE',
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myAppointmentsHeader: {
    height:105,
    width: windowWidth,
    backgroundColor: colors.THEME,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: '15%',
  },
});

//make this component available to the app
export default AppointmentScreen;
