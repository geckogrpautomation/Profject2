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
      res.render("login");
    }
    
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
       res.render("signup");
    
    
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

app.get('/eonet', isAuthenticated , (req, res) => {
  const server = "https://eonet.sci.gsfc.nasa.gov/api/v3/events";
  fetch(server)
    .then(response => response.json())
    .then(data =>{      
          
      res.render('eonet', {eventTitle : data.events[0].title,  category :data.events[0].categories[0].title , eventId : data.events[0].id , date : data.events[0].geometry[0].date, location: data.events[0].geometry[0].coordinates,
      
        eventTitle1 : data.events[1].title ,  category1 :data.events[1].categories[0].title , eventId1: data.events[1].id , date1 : data.events[1].geometry[0].date, location1: data.events[1].geometry[0].coordinates,
      
        eventTitle2 : data.events[2].title ,  category2 :data.events[2].categories[0].title , eventId2: data.events[2].id , date2 : data.events[2].geometry[0].date, location2: data.events[2].geometry[0].coordinates,
        eventTitle3 : data.events[3].title,  category3 :data.events[0].categories[0].title , eventId3: data.events[3].id , date3: data.events[3].geometry[0].date, location3: data.events[3].geometry[0].coordinates,
      
        eventTitle4 : data.events[4].title ,  category4 :data.events[1].categories[0].title , eventId4: data.events[4].id , date4 : data.events[4].geometry[0].date, location4: data.events[4].geometry[0].coordinates,
        
        eventTitle5 : data.events[5].title ,  category5 :data.events[2].categories[0].title , eventId5: data.events[5].id , date5 : data.events[5].geometry[0].date, location5: data.events[5].geometry[0].coordinates,
      })
  });
 
   

  //fetch and return json data

});
// Start of addition for Mars Rover Application

app.get('/mars-rover', isAuthenticated , (req, res) => {

  res.render('mars-rover')
})

// End of addition for Mars Rover Application

app.get('/nearearth', isAuthenticated , (req, res) => {

      res.render('nearearth')
       
});

app.get ('/nasaimg' , isAuthenticated , (req,res) => {

    res.render('nasaimg')

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

    let message = {message: 'The API needs date ranges to be less than 7 days'};

    res.json(message);       
   
  }  
  else if (dateDiff<0){   

    let message = {message: 'The date range is less than zero days'};
    
    res.json(message);    
      
  }  
    
});

app.get('*' , function (req,res){

  res.status(404);
  res.render('fourOfour', {title: '404: File Not Found'});

});


}//End module exports.