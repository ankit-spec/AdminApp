import {REGISTER_EMPLOYEE,REMOVE_REGISTER} from '../actions/auth';
const initialState = {
  bussinessImage: '',
  name: '',
  bussinesscover:'',
  code: '',
  bussinessname:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_EMPLOYEE:
      return {
        bussinessImage: action.bussinesimage,
        name: action.name,
        code: action.code,
        bussinesscover:action.imageCover,
        bussinessname:action. bussinessname
      };
    case REMOVE_REGISTER:
      console.log(action,'action')
      return {
        code: '',
        bussinessImage: action.payload.data.bussinessImage,
        name: action.payload.data.name,
        bussinesscover: action.payload.data.bussinesscover,
        bussinessname:action.payload.data.bussinessname

      };

    default:
      return {...state};
  }
};
