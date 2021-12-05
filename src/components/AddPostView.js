import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, PlatformColor} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {RFValue} from 'react-native-responsive-fontsize';
import {verticalScale, moderateScale} from '../styles/responsiveStyles';
const BLUE = 'blue';
const YELLOW = 'yellow';

const AddPostView = ({newImages, addImages}) => {

  return (
    <View style={{flex: 1}}>
      {newImages?.length > 0 ? (
        <View style={{marginHorizontal:Platform.OS==='android'?'10%':'13%'}}>
        <Carousel
          layout={'default'}
          useScrollView={true}
          data={newImages}
          onSnapToItem={index => console.log(index)}
          sliderWidth={400}
          itemWidth={400}
          vertical={false}
            renderItem={({item, index}) => {
          return (
            <TouchableOpacity
            onPress={addImages}
            key={index}
           >
              <Image
                source={{uri: item.path}}

                style={{
                  height:200,
                  width: 280,
                  margin: 5,
                  borderRadius: 18,
                }}
              />
            </TouchableOpacity>
          );
        }}
        />
        </View>
      ) : (
        //   <Carousel
        //   layout={'default'}
        //   useScrollView={true}
        //   data={imageList}
        //   sliderWidth={310}
        //   itemWidth={900}
        //   renderItem={({item, index}) => {
        //     return (
        //       <View style={{marginBottom: '10%'}}>
        //         <Image
        //           source={item.imageUrl}
        //           style={{
        //             height:300,
        //             width: 300,
        //             margin: 5,
        //             borderRadius: 18,
        //           }}
        //         />
        //       </View>
        //     );
        //   }}
        // />
        <TouchableOpacity
          onPress={addImages}
          style={{backgroundColor: 'white', marginHorizontal: '15%',borderRadius:6}}>
          <View
            style={{
              marginTop: '5%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: RFValue(16),
                fontFamily: 'IBMPlexSansHebrew-Bold',
                color: '#5E6167',
              }}>
                בחירת תמונות.
            </Text>
          </View>
          <View style={{marginTop: '5%', marginHorizontal: '4%'}}>
            <Text
              style={{
                color: '#5E6167',
                opacity: 0.6,
                textAlign: 'center',
                fontSize: RFValue(12),
              }}>
                יש לבחור תמונות של העבודות הכי יפות שלך אתם נציג ללקוחות
            </Text>
          </View>
          <View
                    style={{
                      marginTop: '4%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#C7CEDE',
                      height: verticalScale(34),
                      marginHorizontal: '25%',
                      borderRadius: moderateScale(6),
                      marginBottom:'5%'
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(14),
                        fontFamily: 'IBMPlexSansHebrew-Bold',
                        color: '#20304F',
                        textAlign: 'center',
                      }}>
                        בחירת תמונות

                    </Text>
                  </View>
                
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddPostView;
