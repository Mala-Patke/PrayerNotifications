const fs = require('fs');
const path = require('path');

module.exports = () => {
    const pathtodata = path.join(__dirname, '../data.txt');
    const rawuserdata = fs.readFileSync(pathtodata);
    const parseddatapoints = rawuserdata.toString().split('\n');  

    let obj = {};
    for(let point of parseddatapoints){
        let keyval = point.split("=");
        obj[keyval[0].trim()] = keyval[1].trim();
    }

    return obj;
}