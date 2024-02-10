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



//thinking I can show the default values for no, nat, excluded fields and let them be editable. would need the full list of fields from the API (or since there is documentation, just hardcode the fields to reduce API calls...); could also give a set of numbers (12, 24, 36, 48...); and provide a list of country options. Since it's all documented out, could use a <select> for nat and fields and maybe just allow user to enter in the number of fields in a textbox --- could even hide all this in a settings menu / modal ....
