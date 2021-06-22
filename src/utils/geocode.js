
const req = require('got');

const geocode = (location,callback) => {
    var loc = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(location)+ ".json?access_token=pk.eyJ1IjoiMXNhc2IiLCJhIjoiY2txMW5iOGh5MDFhdTJ2bzR2Z3ZlOGV5eCJ9.ksyCNozzneKmxCT-CGdYjA&limit=1";

    (async () => {
	
        try{
            const {body} = await req.get(loc, {
                responseType: 'json'
            });

            coordinates = {'Longitude': body.features[0].center[0],
                            "Latitude": body.features[0].center[1],
                            "Location": body.features[0].place_name}

            callback(coordinates)

        }catch(error){
            callback(error.name)
        }
        
    })();
    

}

module.exports = geocode
