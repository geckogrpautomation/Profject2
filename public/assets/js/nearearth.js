let startDatePkr;
let endDatePkr;
let alphaNumStore = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nice","Ten"];
let errMessageObj;

window.addEventListener("load", function () {

  errMessageObj = document.getElementById("errMessage");
  document.getElementById('errMessage').style.display='none';
  document.getElementById('spinner').style.display='none';

    // Instantiate the date pickers
    startDatePkr = MCDatepicker.create({ 
        el: '#start',
        dateFormat: 'DD-MM-YYYY'
    })

    endDatePkr = MCDatepicker.create({ 
        el: '#end',
        dateFormat: 'DD-MM-YYYY'
    })
    
    //Get search button and add click event to it.
    document.getElementById('searchNeoWs').addEventListener('click' , () => {

      document.getElementById('spinner').style.display='block';
      errMessageObj.textContent = "";
      errMessageObj.style.display='none';

      getData().then(data => {

        if (data){

          renderResults(data);

        }
      }); 
    });
}); //End window event listener



 
async function getData() {

  let startDate = startDatePkr.getDate();
  let endDate = endDatePkr.getDate();
  let startMonth = startDatePkr.getMonth();
  let endMonth = endDatePkr.getMonth();
  let startYear = startDatePkr.getYear();
  let endYear = endDatePkr.getYear();

  let startFullDate = `${startYear}-${startMonth}-${startDate}`;
  let endFullDate = `${endYear}-${endMonth}-${endDate}`;


  if ([startDate,endDate,startMonth,endMonth,startYear,endYear].includes(null||undefined||'')){

    alert("Please select start and end dates");
    return null;

  }else{
    //Call API from server and await the repsonse  
    let response = await fetch(`/api/neows/${startFullDate}&${endFullDate}`);
    let data= await response.json();
    //...
    return data;
  }

}
//Render the returned results
function renderResults(data){
  
  if (data.near_earth_objects){

    let keys = Object.keys(data.near_earth_objects);

    let html = "";
      
      keys.forEach((el,i) => {
  
        html= html.concat(buildHead(el,i));      
  
        data.near_earth_objects[el].forEach((el,i) => {
  
          html= html.concat(buildTblBody(el,i));
  
        })
        html = html.concat(buildTblTail());
        html = html.concat(buildEndAcc());
      })
    
      
    insertHtml(html);
  }else{

    document.getElementById('spinner').style.display='none';
    errMessageObj.textContent = data.message;
    errMessageObj.style.display='block';

  }
}
     
 

function buildHead(date,i){

  i++;

  let accHead =` 
  <div class="accordion" id="accordParent${i}">
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${alphaNumStore[i]}">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${alphaNumStore[i]}"aria-expanded="true" aria-controls="collapse${alphaNumStore[i]}">
            ${date}
          </button>
        </h2>
        <div id="collapse${alphaNumStore[i]}" class="accordion-collapse collapse show" aria-labelledby="heading${alphaNumStore[i]}"data-bs-parent="#accordParent${i}">
          <div class="accordion-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Count</th>
                  <th scope="col">Name</th>
                  <th scope="col">Approach time</th>
                  <th scope="col">JPL URL</th>
                  <th scope="col">Abs magnititude h</th>
                  <th scope="col">Est diameter min (km)Estimated_diameter min</th>
                  <th scope="col">Est diameter max (km)</th>
                  <th scope="col">Speed (km/s)</th>
                  <th scope="col">Miss distance (km)</th>            
                  <th scope="col">Threat to earth?</th>
                </tr>
              </thead>`;
return accHead;
}


function buildTblBody(el,i){

  let accTblBody = `
              <tbody>
                <tr>
                  <th scope="row">${i}</th>
                  <td id = "row${i}-name">${el.name}</td>
                  <td id = "row${i}-aDate">${el.close_approach_data[0].close_approach_date_full}</td>
                  <td id = "row${i}-jpl-url"><a href="${el.nasa_jpl_url}"target="_blank">Jet Propulsion Lab. Specific Information</a></td>
                  <td id = "row${i}-absMag">${el.absolute_magnitude_h}</td>
                  <td id = "row${i}diaMin">${el.estimated_diameter.kilometers.estimated_diameter_min}</td>
                  <td id = "row${i}diaMax">${el.estimated_diameter.kilometers.estimated_diameter_max}</td>
                  <td id = "row${i}velKms">${el.close_approach_data[0].relative_velocity.kilometers_per_second}</td>
                  <td id = "row${i}missKm">${el.close_approach_data[0].miss_distance.kilometers}</td>    
                  <td id = "row${i}haz">${el.is_potentially_hazardous_asteroid}</td>
                </tr>    
  `;

return accTblBody;

}


function buildTblTail(){

  let accTail = `

            </tbody>
            </table>
          <div>
        `;

  return accTail;

}

function buildEndAcc(){

  let accEnd = `
      </div>
    </div>
  </div>
    `
return accEnd;
}


function insertHtml(html){

  document.getElementById("accInsert").innerHTML = html;

  document.getElementById('spinner').style.display='none';

  localStorage.setItem('html' , html);
}
