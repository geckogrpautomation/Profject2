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
      
    fetch('https://api.nasa.gov/planetary/apod?count=3&api_key=Vc6jvuVGkgq2YHIkvZ75oSPNytwpCfxAIO913y6c')

    .then(response => response.json())

    .then(data => {
        
        console.log(data)
        
        res.render('home', {url1 : data[0].url , date1 :data[0].date , title1 : data[0].title , explanation1 : data[0].explanation,
        
                            url2 : data[1].url , date2 :data[1].date , title2: data[1].title , explanation2 : data[1].explanation,
        
                            url3 : data[2].url , date3 :data[2].date , title3: data[2].title , explanation3 : data[2].explanation,
        })
    });
       
});

app.get('/nearearth', isAuthenticated , (req, res) => {

      res.render('nearearth')
       
});

app.get('*' , function (req,res){

  res.status(400);
  res.render('fourOfour', {title: '404: File Not Found'});

});




};//End module exports.