//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet ,Image,FlatList,TouchableOpacity} from 'react-native';
import { scale,verticalScale,moderateScale } from '../../styles/responsiveStyles';
import { RFValue } from 'react-native-responsive-fontsize';
import Threeline from '../../assets/icons/threeLine.svg'
const DATA=[
    {
        id:0,
        text:'ג’ל רגיל',
        text1:'50 דק’'
    },
    {
        id:1,
        text:'ג’ל רגיל',
        text1:'50 דק’'
    },
    {
        id:2,
        text:'ג’ל רגיל',
        text1:'50 דק’'
    },
    {
        id:3,
        text:'ג’ל רגיל',
        text1:'50 דק’'
    }
]
const ShowService = () => {
    return (
        <View style={styles.container}>
             <View
        style={{
          marginTop: '35%',
          flexDirection: 'row',
          marginHorizontal: '13%',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: scale(40),
            height: verticalScale(46),
          }}
          source={require('../../assets/icons/ProfileIcon1/ProfileIcon.png')}
        />
        <Text
          style={{
            marginLeft: '5%',
            fontSize: RFValue(18),
            fontFamily: 'IBMPlexSansHebrew-Bold',
            color: '#5E6167',
          }}>
          לודמילה
        </Text>
      </View>
      <View style={{marginTop:'0%',margin:'5%'}}>
<FlatList
data={DATA}
keyExtractor={item=>item.id}
renderItem={({item,index})=>{
    return(
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate('details')
        }}
        style={{padding:'5%'}}>
            <View  style={{backgroundColor:'white',height:verticalScale(80),borderRadius:moderateScale(20),alignItems:'center',flexDirection:'row',flex:1}}>
                <View style={{flex:0.8,flexDirection:'column'}}>
          <View style={{marginLeft:'5%'}}>
            <Text
               style={{
                
                fontSize: RFValue(16),
                fontFamily: 'IBMPlexSansHebrew-Bold',
                color: '#5E6167',
              }}
            >
                
                {item.text}
            </Text>
            </View>
            <View>
            <Text
               style={{
                   textAlign:'left',
                marginLeft: '5%',
                fontSize: RFValue(14),
                fontFamily: 'IBMPlexSansHebrew-Regular',
                color: '#A3A4A8',
              }}
            >
                
                {item.text1}
            </Text>
            </View>
            </View>
            <View style={{flex:0.2,alignItems:'center'}}>
         <Threeline/>
        </View>
            </View>
            </TouchableOpacity>
    )
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
});

//make this component available to the app
export default ShowService
