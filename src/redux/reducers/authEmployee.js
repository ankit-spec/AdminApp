import { act } from 'react-test-renderer';
import {REGISTER_EMPLOYEE,REMOVE_REGISTER} from '../actions/auth';
const initialState = {
  bussinessImage: '',
  name: '',
  bussinesscover:'',
  code: '',
  bussinessname:'',
  bussissAddress:'',
  insta:'',
  logo:'',
  phone:'',
  email:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_EMPLOYEE:
      return {
        bussinessImage: action.bussinesimage,
        name: action.name,
        code: action.code,
        bussinesscover:action.imageCover,
        bussinessname:action.bussinessname,
        bussissAddress:action.bussissAddress,
        insta:action.insta,
        logo:action.logo,
        phone:action.phone,
        email:action.email
      };
    case REMOVE_REGISTER:
      console.log(action,'action')
      return {
        code: '',
        bussinessImage: action.payload.data.bussinessImage,
        name: action.payload.data.name,
        bussinesscover: action.payload.data.bussinesscover,
        bussinessname:action.payload.data.bussinessname,
        bussissAddress:action.payload.data.bussissAddress,
        insta:action.payload.data.insta,
        logo:action.payload.data.logo,
        phone:action.payload.data.phone,
        email:action.payload.data.email

      };

    default:
      return {...state};
  }
};
