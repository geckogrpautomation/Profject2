function buildQueryURL (){
    var queryURL = "https://images-api.nasa.gov/search?q=";
    //let apiKey= "api-key=40oybVpj87mDGAChA8n2BolWbJMkR2NyT4NRNbwB";
    var search = $("#nasaImgSearch").val().trim();
    return queryURL + search;

}

function updatePage(data){

  let numImages = document.getElementById("imageCount").value;
 
  for (var i = 1; i < numImages; i++) {

       // Create the  list group to contain the articles and add the article content for each
    var list = $("#list");
    list.addClass("list-group");
    //
    list.append(`<li>${i}</li>`)
    list.append(`<strong>Title:</strong>${data.collection.items[i].data[0].title}`);
    list.append(`<strong>Description:</strong>${data.collection.items[i].data[0].description}`);
    list.append(`<strong>Date Created:</strong>${data.collection.items[i].data[0].date_created}`);
    list.append(`<img src="${data.collection.items[i].links[0].href}">`);
  }
}

async function getData(){
  var queryURL = buildQueryURL();
  //Call API from server and await the repsonse  
  var response = await fetch(queryURL);
  var data= await response.json();
  //...
  return data;
}
window.addEventListener("load", function () {

  
  $("#searchNasa").on("click", function (event) {
      event.preventDefault();      

      getData().then(data => {

        updatePage(data);
      
      });     
  });
})