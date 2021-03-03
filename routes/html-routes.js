// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const fetch = require('node-fetch');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const DAILY_BASEPATH = 'https://api.nasa.gov/planetary/apod?count=1';
const API_KEY = '&api_key=Vc6jvuVGkgq2YHIkvZ75oSPNytwpCfxAIO913y6c';


module.exports = function(app) {
  
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    console.log("request user ---> " + req.user);
    if (req.user) {
      res.render("members");
    }
    else{
      res.render('login');
    }
    
    //res.sendFile(path.join(__dirname, "../views/login.html"));
  });
  
 app.get('/members' , isAuthenticated , (req, res) => {

  if (req.user) {
    
    fetch('https://api.nasa.gov/planetary/apod?count=1&api_key=Vc6jvuVGkgq2YHIkvZ75oSPNytwpCfxAIO913y6c')

    .then(response => response.json())

    .then(data => {
        
        console.log(data)
        
        res.render('home', {url : data[0].url , date :data[0].date , title : data[0].title , explanation : data[0].explanation })
    });

  }

  else{

  res.sendFile(path.join(__dirname, "../public/login.html"));

  }

    
    
});

app.get('/nearearth', isAuthenticated , (req, res) => {

      res.render('nearearth')

 
       
});

app.get('*' , function (req,res){

  res.status(400);
  res.render('fourOfour', {title: '404: File Not Found'});

});




};//End module exports.