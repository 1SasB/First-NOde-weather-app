const req = require('got');
// var url = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02";



var forcast = (lat,long,area,callback) => {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+ encodeURIComponent(lat) + "&lon=" + encodeURIComponent(long) + "&appid=eb87c1a3eea3dc481843320ced0c9edf";
    try{
        (async () => {
            const {body} = await req.get(url, {
                responseType: 'json'
            });
    
            // console.log("it is currently "+body.main.temp+" degrees Fareinheit outside");
            //=> {hello: 'world'}
            callback({'temperature': body.main.temp ,'area':area});
        })();

    }catch(error){
        callback(error.name)
    }
    

}

module.exports = forcast


