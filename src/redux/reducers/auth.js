import {PHONE_SIGNIN, REGISTER, VERIFY_OTP} from '../actions/auth';
const initialState = {
  phone: '',
  otp: '',
  id:'',

};

export default (state = initialState, action) => {
  switch (action.type) {
    case PHONE_SIGNIN:
      return {
        phone: action.phone,
        otp: action.otp,
      };
 case VERIFY_OTP:
      return {
        token: action.token,
        id:action.id,
      };
    default:
      return {...state};
  }
};
