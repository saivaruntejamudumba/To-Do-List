//jshint esversion:6

const express =require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
let items = [];
let workItems=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){

  let day= date.getDay();

  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/",function(req, res){
  let input = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(input);
    res.redirect("/work");
  }else{
    items.push(input);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list",{listTitle: "Work List", newListItems: workItems} );
});

app.get("/about", function(req, res){
  res.render("about");
});



app.listen(3000, function(){
  console.log("server has started on port 3000");
});
