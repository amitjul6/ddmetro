//imported external & core modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

//_______________________________________________
//mySQL DB Connection
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sukh1@me",
    database: "mydb"
})

conn.connect(function(err){
    if (err) throw err;
    console.log("connected to Mysql")
    
//
var check = conn.query("SHOW DATABASES LIKE 'mydb';")
if (check="mydb"){
    console.log("DB "+check+" exists, skipping step")
    //conn.query("USE mydb")
    console.log("Using mydb as Database")
}
else{
    conn.query("CREATE DATABASE mydb", function (err, result){
    if (err) throw err;
    console.log("Database created")})
}
    
})
//________________________________________________

const app = express();

app.get("/", function(req, res){
    res.sendFile(path.join('/Users/amitmurde/Documents/PROJECT expense Tracker/Static','index.html'))
})

app.listen(3000)

app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname,'./Static')));

//_________________________________________________
app.post('/add', function(req,res){
    
      conn.query('INSERT INTO mytable(fname,lname) VALUES(?,?)', [req.body.fname, req.body.lname], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New employee has been added");
        res.send("New employee has been added into the database with ID = "+req.body.fname+ " and Name = "+req.body.lname);
      });
  });
  //});

app.post('/view', function(req,res){
    
    conn.query('select * from mytable', function(err, row) {
      if (err) {
        return console.log(err.message);
      }
      res.send(row);
     
        
      })

    })

