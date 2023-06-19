const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true})); 


app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "91ba0ba77a474f085dbbc169537bc66a";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url, function(response){
       // console.log(response);
       response.on("data", function(data){
        const weatherData = JSON.parse(data); //to turn into json object
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const img = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>The weather is currently "+description +". </p>");
        res.write("<h2>The temperature in "+query+" is "+temp+" degrees Celsius.</h2>");
        res.write(`<img src=${img}>`);
        res.send();
     })
    });
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})