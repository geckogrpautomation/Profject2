
window.addEventListener("load", function () {

  let emailInput = document.getElementById("email-input");
  let passwordInput = document.getElementById("password-input");

  let signUpForm = document.getElementById("form-signUp");
  console.log(signUpForm);
  // Getting references to our form and input
 
  // When the signup button is clicked, we validate the email and password are not blank

  signUpForm.addEventListener("submit", (event) => {
  
    event.preventDefault();
    const userData = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    let user = JSON.stringify(userData);
    // If we have an email and password we run the loginUser function and clear the form
    // If we have an email and password, run the signUpUser function
    signUpUser(user);
    emailInput.val("");
    passwordInput.val("");

  }); //End form submit event listener
  
}); 
   
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
function signUpUser(user) {

  fetch("/api/signup", { 
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json'
    }, 
    
    body: user
  }) 
  .then(() => {
    window.location.replace("/home");
    // If there's an error, log the error
  })
  .catch(err => {
    console.log(handleLoginErr);
  });
}


function handleLoginErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}



