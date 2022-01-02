const express = require('express')
const app = express()
const port = 3000
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.set('view engine','ejs')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"mydb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE details(personid int NOT NULL AUTO_INCREMENT,name varchar(255),email varchar(255),password VARCHAR(255), primary key(personid))";
    con.query(sql, function (err, result) {
      if (err) {
          console.log("already table created");
      }
      else
      console.log("Table created");
    });
  });
app.get('/', function(req, res) {
    res.render('insert');
});
app.post('/insert',function(req,res){
        var name=req.body.nameS;
        var email=req.body.emailS;
        var password=req.body.passwordS;
        // console.log(name,email,password);
        var sql =`insert into details(name,email,password) values('${name}','${email}','${password}')`
        con.query(sql,(err,result)=>{
            if (err) throw err;
            res.send("<h1> Data is inserted </h1>")
        })


    })
    app.get('/show',(req,res)=>{
        var sql="select * from details";
        con.query(sql,(err,result)=>{
            if (err) throw err;
            res.render('show',{datas:result})
    })
}),
app.get('/delete/:id',(req,res)=>{
    // which data will dlete which we want                                                                                                          
    var id=req.params.id;
    var sql=`delete from details  where personid='${id}'`;
con.query(sql,function(err,result){
    if (err) throw err;
    res.redirect('/show');
})
app.get('/edit/:id',(req,res)=>{
    var id=req.params.id;
    var sql=`select * from details where personid='${id}'`;
    con.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('edit',{datas:results})

    })
})
})
app.post('/update/:id',(req,res)=>{
    var id=req.params.id 
    var name=req.body.nameS;
    var email=req.body.emailS;
    var password=req.body.passwordS;
    var sql=`UPDATE details set name='${name}',email='${email}',password='${password}' where personid='${id}'`;
con.query(sql,(err,results)=>{
    if (err) throw err;
    res.redirect('/show')
})
}),

app.listen(port, () => console.log(`Example app listening on port ${port}!`))