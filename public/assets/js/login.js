
window.addEventListener("load", function () {

  // Getting references to our inputs
  let emailInput = document.getElementById("email-input");
  let passwordInput = document.getElementById("password-input");

  let loginForm = document.getElementById("form-login");
  console.log(loginForm);
  loginForm.addEventListener("submit", (event) => {
  
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
    loginUser(user);
    emailInput.val("");
    passwordInput.val("");

  }); //End form submit event listener
  
}); //End window on load event listener

  
// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser(user) {

  fetch("/api/login", { 
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
    console.log(err);
  });

}



