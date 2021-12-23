export const API_BASE_URL = 'http://18.159.82.242/';
export const getApiUrl = endPoint => API_BASE_URL + endPoint;

export const PHONE_API = getApiUrl('v1/business/login');
export const VERIFY_OTP_URL = getApiUrl('v1/business/otp_verify');
export const REGISTER_URL = getApiUrl('v1/business/update_profile_info');
export const GET_REGISTER_DATA = getApiUrl('v1/business/profile_data');
export const UPDATE_BUSSINESS_COVER=getApiUrl('v1/business/update_profile_business');
export const CREATE_EMPLOYEE=getApiUrl('v1/business/create_employee');
export const GET_EMPLOYESS=getApiUrl('v1/business/get_employees/');
export const CREATE_SERVICE=getApiUrl("v1/services/create");
export const GET_SERVICES=getApiUrl("v1/services/get_services");
export const UPDATE_SERVICES=getApiUrl('v1/services/update')
export const UPDATE_EMPLOYEE=getApiUrl('v1/business/update_employee')
export const CREATE_SCHEDULE=getApiUrl('v1/schedule/create')
export const BLOCK_DATE=getApiUrl('v1/schedule/blockDates')
export const UPDATE_BLOCK_DATE=getApiUrl('v1/schedule/updateBlockDate')