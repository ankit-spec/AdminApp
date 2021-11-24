import {
  
    PHONE_API,
    REGISTER_URL,
    VERIFY_OTP_URL,
    GET_REGISTER_DATA
  } from '../../config/config';
  import {clearUserData} from '../../utils/helperFunction';
  import types from '../types';
  import store from '../store';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  export const PHONE_SIGNIN = 'PHONE_SIGNIN';
  export const VERIFY_OTP = 'VERIFY_OTP';
  export const REGISTER = 'REGISTER';
  
  export const phoneSignin = phone => {
    return async dispatch => {
      const response = await fetch(PHONE_API, {
        method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone: phone}),
      });
      const resData = await response.json();
      console.log(resData, 'data<<====');
      dispatch({
        type: PHONE_SIGNIN,
        phone,
        otp: resData.otp,
      });
    };
  };
  
  export const verifyOtp = (otp, phone) => {
    return async dispatch => {
      const response = await fetch(VERIFY_OTP_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: otp,
          phone: phone,
        }),
      });
      const resData = await response.json();
    //  console.log(resData, 'dataotppppp<<====');
      dispatch({
        type: VERIFY_OTP,
        token: resData.token.access.token,
        id:resData.user.id,
       
      });
  
      await AsyncStorage.setItem('@storage_Key', resData.token.access.token);
  
      //  await AsyncStorage.setItem('token', resData.token.access.token);
      //  let userId = await AsyncStorage.getItem('token');
      //  console.log(userId,'token')
    };
  };
  
  export const resgistration = (name, dateOfBirth, businessId) => {
    return async dispatch => {
      const value = await AsyncStorage.getItem('@storage_Key');
      console.log(value, 'value');
      const response = await fetch(REGISTER_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: value,
        },
        body: JSON.stringify({
          name: name,
          dateOfBirth: dateOfBirth,
          businessId: businessId,
        }),
      });
      const resData = await response.json();
      //  console.log(resData, 'data<<====');
      dispatch({
        type: REGISTER,
        firsttimeinapp: resData.user.first_time,
       id: resData.user._id,
       data:resData.user
      });
    };
  };
  
  
  export function logout() {
    dispatch({ type: types.CLEAR_REDUX_STATE });
    clearUserData();
  }
  
  export const getProfileData = () => {
    return async dispatch => {
      const value = await AsyncStorage.getItem('@storage_Key');
  
      try {
        const response = await fetch(GET_REGISTER_DATA, {
          headers: {Authorization: value},
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const resData = await response.json();
       console.log('ordersdata===>>>>', resData);
        //   dispatch({type: SET_ORDERS, orders: loadedOrders});
      } catch (err) {
        throw err;
      }
    };
  };
  