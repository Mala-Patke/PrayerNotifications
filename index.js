const { EventEmitter } = require('events');
const parsedPrayerTimes = require('./src/parsePrayerTimes');
const { notify } = require('node-notifier');
const { join } = require('path');

const emitter = new EventEmitter();

let startdate = new Date(Date.now());
let prayertimes;

//Load Prayertimes on start
(async () => {
    prayertimes = await parsedPrayerTimes();
})();


function getNextPrayer(){
    let now = Date.now();
    let keys = Object.keys(prayertimes);
    let vals = Object.values(prayertimes);

    for(let i = 0; i < vals.length; i++){
        if(now < vals[i]) return { name: keys[i], time: vals[i]};
    }
    return { name: keys[0], time: vals[0] }
}

//Load Prayertimes daily
emitter.on('newDay', async () => {
    prayertimes = await parsedPrayerTimes();
})

//Notify on prayer
emitter.on('newPrayer', (name) => {
    notify({
        title:"Prayer Notifications",
        icon: join(__dirname, '/icons/img'),
        message:`${name} is at ${Date.now()}`,
        sound:true,
        
    })
})

//Actually do the stuff
setInterval(async () => {
    let nowdate = Date.now();

    //New Day
    if(startdate.getDate() !== new Date(nowdate).getDate()){
        emitter.emit('newDay');
    }

    //Next Prayer
    if(nowdate > getNextPrayer().time){
        emitter.emit('newPrayer', getNextPrayer().name);
    }
    console.log(nowdate, JSON.stringify(getNextPrayer()));

}, 60000);