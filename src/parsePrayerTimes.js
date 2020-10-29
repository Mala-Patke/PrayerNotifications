const importedPrayerTimes = require('./getPrayerTimes');

module.exports = async () => {
    let data = await importedPrayerTimes();
    const prayernames = Object.keys(data.timings);
    const prayertimes = Object.values(data.timings);
    for(let i in prayernames){
        data.timings[prayernames[i]] === Date.parse(`${data.date.readable} ${prayertimes[i]}:00`);
    }
    ['Sunrise', 'Sunset', 'Midnight', 'Imsak'].forEach(element => delete data.timings[element]);
    return data.timings;
}