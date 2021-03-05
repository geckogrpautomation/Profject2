// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const fetch = require('node-fetch');
const dayjs = require('dayjs');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const DAILY_BASEPATH = 'https://api.nasa.gov/planetary/apod?count=1';
const API_KEY = '&api_key=Vc6jvuVGkgq2YHIkvZ75oSPNytwpCfxAIO913y6c';

module.exports = function(app) {
  
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }else{
      res.render("signup");
    }
    
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    console.log("request user ---> " + req.user);
    if (req.user) {
      res.redirect("/home");
    }
    else{
      res.render('login');
    }
    
    //res.sendFile(path.join(__dirname, "../views/login.html"));
  });
  
 app.get('/home' , isAuthenticated , (req, res) => {
      
    fetch('https://api.nasa.gov/planetary/apod?count=3&api_key=Vc6jvuVGkgq2YHIkvZ75oSPNytwpCfxAIO913y6c')

    .then(response => response.json())

    .then(data => {      
        
        res.render('home', {url1 : data[0].url , date1 :data[0].date , title1 : data[0].title , explanation1 : data[0].explanation,
        
                            url2 : data[1].url , date2 :data[1].date , title2: data[1].title , explanation2 : data[1].explanation,
        
                            url3 : data[2].url , date3 :data[2].date , title3: data[2].title , explanation3 : data[2].explanation,
        })
    });
       
});

app.get('/nearearth', isAuthenticated , (req, res) => {

      res.render('nearearth')
       
});

app.get("/api/neows/:date",isAuthenticated ,(req, res) => {

  let date = req.params.date.split('&')


  const startDate= dayjs(date[0]);
  const endDate= dayjs(date[1]);

  let dateDiff = endDate.diff(startDate, 'day');
  console.log(dateDiff);

  if (dateDiff < 7 && dateDiff > 0 ){

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date[0]}&end_date=${date[1]}${API_KEY}`)

    .then(response => response.json())
    .then( (data)  => {
      
      res.json(data);
    });
  }
  else if (dateDiff > 7){ 

    res.render('nearearth',{message: 'The API needs date ranges to be less than 7 days'});   
   
  }  
  else if (dateDiff<0){    
    
    res.render('nearearth',{message: 'The date range is less than zero days'});  
   
  }  
    
});

app.get('*' , function (req,res){

  res.status(404);
  res.render('fourOfour', {title: '404: File Not Found'});

});


}//End module exports.