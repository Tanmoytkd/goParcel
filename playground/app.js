var express = require('express');
var mysql = require('mysql');
var bodyParser=require('body-parser');
var app = express();
var port = 3000;


function createTable(db,query)
{
    db.query(query, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
}

function insertData(db,values)
{
    var query = "INSERT INTO customers (name, phone) VALUES ?";
    db.query(query,[values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
}
function readData(db,callback)
{
    
    db.query("SELECT * FROM customers", function (err, result, fields) {
       
        console.log(result);
        callback(err,result);
      });
}


app.use(bodyParser());

var db = mysql.createConnection({
    host: "goparcel-mysql.cyx2tcpl1rir.us-east-1.rds.amazonaws.com",
    user: "goParcel",
    password:"thenotebook"
    
  });

  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected! to MySql");
    
  });
//database connection
  db.query("USE goParcel", function (err, result) {
    if (err) throw err;
    console.log("Database connected");
  });

  //var sql = "CREATE TABLE customers (name VARCHAR(255), phone VARCHAR(255))";
  //createTable(db,sql);
  var values = [
    ['John', '101'],
    ['Peter', '102'],
    ['Amy', '103'],
    ['Hannah', '104'],
    ['Michael', '105'],
    ['Sandy', '106'],
    ['Betty', '107'],
    ['Richard', '108'],
    ['Susan', '109'],
    ['Vicky', '110'],
  
  ];

  //insertData(db,values);
  //readData(db);




console.log(":P :P :P");
app.get('/', function (req, res) {
    res.write('Hello----->>>> World!!!\n');
    res.write(' World!!!\n');
    res.write('Hello !!!\n');
    res.write('Hello--------> World!!!\n');
    res.end('bye bye');
});
app.get('/Home', function (req, res) {
    res.write('Home----> !!!\n');

    res.end('bye bye');
});
app.get('/api/newParcel', function (req, res) {

    var parcel = {
        type: "parcel",
        sender: "Tkd",
        cost: 30,
        receiever: "Rowan",
        address: "Dhaka"


    };
    parcel.cost*=2;
    parcel.expire="02/02/2019";
    var output=JSON.stringify(parcel);
    console.log(parcel);
    res.send(output);
});
console.log("listening to port " + port);





app.get('/insert', function (req, res) {
   res.sendfile("./index.html");
});

app.post('/insert', function (req, res) {
    var value=[[req.body.name,req.body.phone]];
    insertData(db,value);
    res.end(JSON.stringify(req.body));
 });


 app.get('/data', function (req, res) {
   readData(db,function(err,result){
    if (err) throw err;
    res.end(JSON.stringify(result));
    });
 });
// db.query("CREATE DATABASE mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });







app.listen(port);