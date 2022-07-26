const express = require("express");
const app = express();
const port = process.env.PORT | 1234;

app.listen(port,function () {
    console.log("server is running..");
});
app.set("view engine","ejs");
app.use(express.static("public")); // cho phep truy cap cac file static

// ket noi db
const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "T2203E",
    multipleStatements: true
});

var count = 0;
// list route
app.get("/",function (req,res) {
    count++;
    /// truy van dc db để lấy ds sinh viên
    const sql_txt = "select * from students";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var studentList = data;
            res.render("home",{
                "count":count,
                "studentList":studentList
            });
        }
    })

});
app.get("/classes",function (req,res) {
    count++;
    /// truy van dc db để lấy ds sinh viên
    const sql_txt = "select * from classes";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("404 not found");
        else{
            var studentList = data;
            res.render("classes",{
                "count":count,
                "studentList":studentList
            });
        }
    })

});

app.get("/classes-detail",function (req,res) {
    // phải tìm cách lấy đc giá trị tham số trên url
    var cid = req.query.cid;
    // var s = req.query.s;
    // "select * from students where name like '%"+s+"%';";
    const sql_txt = "select * from classes where cid= " +cid+";"+
        "select * from students where cid ="+cid+";";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else{
            if(data[0].length > 0){
                var classDetail = data[0][0];// null
                var studentList = data[1];
                res.render('classdetail',{
                    "studentList":studentList,
                    "classDetail":classDetail
                });
            }else{
                res.send("404 not found");
            }

        }
    })

})

app.get("/bong-da",function (req,res) {
    count++;
    res.send({name:"Nguyễn Văn An",age:18});
});

app.get("/demo",function (req,res) {
    count++;
    res.render("demo");
});