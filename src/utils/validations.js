module.exports.emailCheck = (email) => {
    const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validation.test(email);
}
module.exports.passwordCheck = (password) => {
    var num = /^[a-zA-Z\-0-9]{8,14}$/;
    // var num = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#.?!@$%^&*-]).{8,16}$/;
    // password must constain One Capital & small letter with numeric ....eg:- " Hello@123 "
    return num.test(password);
};

module.exports.validatePhoneNumber = (phoneNumber) => {
    if (!/^[0][1-9]$|^[1-9]\d{8,14}$/.test(phoneNumber)) {
        return 'Please enter valid mobile number';
    }
    return '';
}