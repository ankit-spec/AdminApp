//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar,Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AddSerivce } from '..';
import Add from '../../assets/icons/Add.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import { moderateScale, scale, verticalScale } from '../../styles/responsiveStyles';
const DATA=[
    {
        id:0,
        text:'לודמילה'
    },
    {
        id:1,
        text:'תמי'
    },
    {
        id:2,
        text:'יוגב'
    }
]
const ShowEmployees = ({navigation}) => {
    return (
        <View style={styles.container}>
             <StatusBar
        animated={false}
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />
           <View style={{height:verticalScale(46),width:scale(40),borderRadius:moderateScale(40),backgroundColor:'white',alignItems:'center',justifyContent:'center',position:'absolute',top:85,zIndex:999,right:50}}>
<Add/>
           </View>
           <View style={{marginTop:'40%',margin:'5%'}}>
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
            <View  style={{backgroundColor:'white',height:verticalScale(80),padding:'5%',borderRadius:moderateScale(20),alignItems:'center',flexDirection:'row',flex:1}}>
                <View style={{flex:0.8,flexDirection:'row',alignItems:'center'}}>
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
              }}
            >
                
                {item.text}
            </Text>
            </View>
            <View style={{flex:0.2,alignItems:'center'}}>
            <Image
          style={{marginLeft:'60%'}}
          source={require('../../assets/icons/SideAccordian/SideAccordian.png')}
        />
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
export default ShowEmployees;
