const request=require('request')

const forecast=(long,lat,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=48874f160517048f347577e5e404e5e3&query='+lat+','+long
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('no network connection',undefined)
        }
        else if(body.error){
            callback('area not found',undefined)
        }
        else{
            callback(undefined,'It is currently '+body.current.temperature+'C and feelslike '+body.current.feelslike+"C")
        }
    })
}
module.exports=forecast