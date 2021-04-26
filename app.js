
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",(req,res) =>{
    res.render("home.ejs");
});

app.post("/", (req,res) => {
    // from bodyParser-
    const location = req.body.cityName;
    // APIkey
    const key = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ location +"&units=metric"+"&appid="+ key;
    https.get(url,(respound) => {
        
        respound.on("data",(data) => {
            const MainData = JSON.parse(data);
            console.log(MainData);
            const temp = MainData.main.temp;
            const feelslike = MainData.main.feels_like;
            const description = MainData.weather[0].description;
            const icon = MainData.weather[0].icon;
            const iconURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.render("result", {eloc: location, etemp: temp, eFeel: feelslike, eDis: description, eImg: iconURL});
           
        });
    });
});

app.get("/about", (req,res)=>{
    res.render("about.ejs")
});

app.get("/contect", (req,res)=>{
    res.render("contect.ejs");
});

app.post("/contect", (req,res)=>{
   res.redirect("/");
})
app.listen(8000, () => {
    console.log("server running port at 8000");
});
