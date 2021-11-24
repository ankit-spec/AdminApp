export const API_BASE_URL = 'http://18.159.82.242/';
export const getApiUrl = endPoint => API_BASE_URL + endPoint;

export const PHONE_API = getApiUrl('v1/business/login');
export const VERIFY_OTP_URL = getApiUrl('v1/business/otp_verify');
export const REGISTER_URL = getApiUrl('v1/business/update_profile_info');
export const GET_REGISTER_DATA = getApiUrl('v1/business/profile_data');
