const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3lhc2hyYSIsImEiOiJjazllNHQ3bnkwOWJ0M2VveWxza28zaHA4In0.QGF5HFEdbxAZXdX7CjQ8nw&limit=1'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('no network connection',undefined)
        }
        else if(body.features.length===0){
            callback('area not found',undefined)
        }
        else{
            callback(undefined,{
            longitude: body.features[0].center[1],
            latitude: body.features[0].center[0],
            location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode