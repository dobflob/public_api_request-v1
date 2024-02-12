let userNo = '12';
let userNat = 'US';
let excludeFields = ['login', 'registered', 'id'];

function createQueryString() {
    let userRequestUrl = 'https://randomuser.me/api/';
    let queryStrings = [];
    if(userNo || userNat || excludeFields) {
        userRequestUrl += '?';
        if (userNo) {
            queryStrings.push(`results=${userNo}`);
        }

        if (userNat) {
            queryStrings.push(`nat=${userNat.toUpperCase()}`);
        }

        if (excludeFields) {
            queryStrings.push(`exc=${excludeFields}`);
        }
    }
    userRequestUrl += queryStrings.join('&');
    return userRequestUrl;
}