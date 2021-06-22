const path = require('path')
const express = require("express");
const hbs = require('hbs');
const { send } = require('process');
const forcast = require('./utils/forcast.js')
const geocode = require('./utils/geocode.js')

const app = express();


//define path for express config
const publicDirectory = path.join(__dirname,'../public')
const ViewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',ViewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectory))



app.get('',(req,res)=>{
    var ctx = {
        "name":'Benjamin Yeboah Sasu',
        "title": "Weather",
        "Age":21
    }
    res.render('index',ctx)
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            'Error':'You must provide an address'
        })
    }
    
    geocode(req.query.address,({Longitude,Latitude,Location} = {}) =>{
        // if(error){
        //     return res.send({
        //         'Error':'Could not load Geocode :('
        //     })
        // }
        forcast(Longitude,Latitude,Location,({temperature,area} = {}) => {
            // if(error){
            //     return res.send({
            //         'Error':'Could not load Forcast :('
            //     })
            // }
            res.send({
                'Temperature':temperature,
                'Area': area
            })

        })
    })
    
})

app.get('/about',(req,res)=>{
    var ctx = {
        "name":'Benjamin Yeboah Sasu',
        "title":'About',
        "Age":21
    }
    res.render('about',ctx)
})

app.get('/help',(req,res)=>{
    var ctx = {
        "helpText":'This is a help text',
        "title": "Help",
        "name":'Benjamin Yeboah Sasu'
    }
    res.render('help',ctx)
})


app.get('/help/*',(req,res) =>{
    var ctx = {
        'title':'404',
        'name': 'Benjamin Yeboah Sasu',
        'errorMessage': 'Help article not found'
    }
    res.render('404',ctx)
})

app.get('*',(req,res) =>{
    var ctx = {
        'title':'404',
        'name': 'Benjamin Yeboah Sasu',
        'errorMessage': 'Page not found'
    }
    res.render('404',ctx)
})

// app.get('/help',(req,res)=>{
//     res.send({'help':'help','age':25})
// })

// app.get('/about',(req,res)=>{
//     res.send('Gold mouth you know about.')
// })

app.listen(300,()=>{
    console.log("The serever is up and running on port 300")
})