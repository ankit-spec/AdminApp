import React from 'react';
import {TimePicker} from 'react-native-simple-time-picker';

const YourApp = () => {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const handleChange = (value) => {
    setHours(value.hours);
    setMinutes(value.minutes);
  };
  return (<TimePicker value={{hours, minutes}} onChange={handleChange} />)
};

export default YourApp