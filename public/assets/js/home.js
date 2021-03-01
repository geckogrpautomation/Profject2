//Get objects 
// const addBurgInpObj = document.getElementById("add-burg-inp");
// const addBurgObj = document.getElementById("add-burg-btn");
// const devBtnObj = document.querySelectorAll('.dev-btn');
// const clrBtnObj = document.querySelectorAll('.clr-btn');

// //Add event handlers.

//********************************************************************HOME PAGE  */
if (window.location.href === (window.location.origin + '/home')){

//Do stuff for home page
console.log('window location worked');

}
else{

    console.log(window.location.origin + '/home');

} 


//*************************Apolinars apge */


// if (devBtnObj){

//   devBtnObj.forEach(btn => {
    
//     btn.addEventListener('click', (e) => {

//       console.groupCollapsed("devBtnObj events added");

//       const id = e.target.getAttribute('data-id');
//       console.log(id);
//       fetch(`/api/devBurger/${id}`, {
//         method: 'POST',
        
//       }).then((response) => {
//         // Check that the response is all good
//         // Reload the page so the user can see the new quote
//         if (response.ok) {
//           console.log(`Devoured burger at index : ${id}`);
//           location.reload('/');
//         } else {
//           alert('something went wrong!');
//         }
//       });
      
//     });
//   });
// }


// if (clrBtnObj){

//   clrBtnObj.forEach(btn => {
    
//     btn.addEventListener('click', (e) => {

//       console.groupCollapsed("devBtnObj events added");

//       const id = e.target.getAttribute('data-id');
//       console.log(id);
//       fetch(`/api/clrBurger/${id}`, {
//         method: 'POST',
        
//       }).then((response) => {
//         // Check that the response is all good
//         // Reload the page so the user can see the new quote
//         if (response.ok) {
//           console.log(`Cleared burger at index : ${id}`);
//           location.reload('/');
//         } else {
//           alert('something went wrong!');
//         }
//       });
      
//     });
//   });
// }



