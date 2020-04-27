const request=require('request')
const geocode=require('./util/geocode.js')
const forecast=require('./util/forecast.js')
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()

//define path for express config
const publicdirpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname, '../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')


//setup handlebars engine
app.set('view engine','hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)
app.use(express.static(publicdirpath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Syed'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',
    {
        title:'About'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            message:'Enter location'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
                if(error){
                    res.send({error})
                    // console.log(error)
                }
                else{
                forecast(latitude,longitude, (error, data) => {
                    if(error){
                        res.send({error})
                    }
                    else{
                        res.send({
                            feels: data,
                            location
                        })
                    }
                    
                  })
                }
            })
          }
    // res.send({
    //     forecast: 32,
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'enter search'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message: 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('the port running is 3000')
})













