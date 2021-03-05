window.addEventListener("load", function () {

  let memberNameObj = document.getElementsByClassName("member-name");
  
  fetch("/api/user_data", { 
    method: 'GET', 
    
  }) 
  .then((data) => {
    memberNameObj.value = data.email;
    // If there's an error, log the error
  })
  .catch(err => {
    console.log(err);
  });

});

