const axios = require('axios').default;
const { encode } = require('querystring');
const readUserData = require('./readUserData');

module.exports = async () => {
    const userdata = readUserData();
    const params = encode(userdata);
    const { data } = await axios.get(`https://api.aladhan.com/v1/timingsByCity/?${params}`)
    if(data.code === "200"){
        let data2 = data.data;
        return data.data;    
    } else {
        throw new Error(`Code:${data.code}\nStatus:${data.status}`);
    }
}