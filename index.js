const express = require("express");
const app = express();
const port = process.env.PORT | 1234;

app.listen(port,function () {
    console.log("server is running..");
});
app.set("view engine","ejs");
var count = 0;
// list route
app.get("/",function (req,res) {
    count++;
   res.render("home",{
       "count":count
   });
});

app.get("/bong-da",function (req,res) {
    count++;
    res.send({name:"Nguyễn Văn An",age:18});
});

app.get("/demo",function (req,res) {
    count++;
    res.render("demo");
});