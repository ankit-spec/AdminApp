import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const showError = message => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message: message,
  });
};

const showSuccess = message => {
  showMessage({
    type: 'success',
    icon: 'success',
    message,
  });
};

export {showError, showSuccess};

export function otpTimerCounter(seconds){
  let m=Math.floor(seconds/60);
  let s=seconds%60;
  m=m<10?"0"+m:m;
  s=s<10?"0"+s:s;
  return (`${m}:${s}`)
}

export async function clearUserData() {
	return AsyncStorage.removeItem('token');
}


