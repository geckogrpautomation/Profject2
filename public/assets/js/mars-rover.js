document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.log('DOM loaded');
    }
    const arrCamera = ["Front Hazard Avoidance Camera", "Rear Hazard Avoidance Camera", "Mast Camera", "Chemistry and Camera Complex",
                        "Mars Hand Lens Imager", "Mars Descent Imager", "Navigation Camera", "Panoramic Camera", "Miniature Thermal Emission Spectrometer"];
    const arrRover = ["Curiosity", "Opportunity", "Spirit", "Perseverance"];
    
    const getPhotosBtn = document.getElementById('get-photos-btn');
    getPhotosBtn.disabled = true;
    const cameraSelect = document.getElementById('camera-select');
    const roverSelect = document.getElementById('rover-select');
    let today = new Date().toISOString().split('T')[0];
    const earthDate = document.getElementById('earth-date');
    earthDate.setAttribute('max', today);
    const dateWarning = document.getElementById('date-warning');
    const imgMainDiv = document.getElementById('img-main-div');

    earthDate.addEventListener('change', (event) => {
        if (earthDate !== "") {
            getPhotosBtn.disabled = false;
            dateWarning.style.display = "none";
        }
    })

    getPhotosBtn.addEventListener('click', (event) => {
        const apiKey = "9tkdaqkVDvK9HaIaAr6x7EemtKpYN9H2eAMp5eLE";
        let dt = earthDate.value;
        console.log(dt);
        let rv = arrRover[roverSelect.value];
        let queryURL1 = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rv}/photos?earth_date=${dt}&api_key=${apiKey}`
        imgMainDiv.innerHTML = "";
        fetch(queryURL1, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            // if there are at least one image available
            if (data.photos.length > 0) {
                console.log(cameraSelect.value);
                console.log(earthDate.value);

                const filteredResult = data.photos.filter(element => element.camera.full_name == arrCamera[cameraSelect.value]);
                console.log (filteredResult);
                // limit the amount of image to be displayed to 5
                let filteredLength = 0;
                if (filteredResult.length > 0 && filteredResult.length > 5) {
                    filteredLength = 5;
                }
                else if (filteredResult.length > 0 && filteredResult.length < 5) {
                    filteredLength = filteredResult.length;
                }
                console.log(filteredLength);
                //no image for selected camera
                if (filteredLength === 0) {
                    const emptyImgH3 = document.createElement("h3");
                    emptyImgH3.textContent = `No image captured using ${arrCamera[cameraSelect.value]}`;
                    emptyImgH3.setAttribute('id', 'zero-camera-img');
                    imgMainDiv.append(emptyImgH3);
                //at least one image in selected camera
                } else {
                    for (let i = 0; i < filteredLength; i++) {
                        const roverNameH4 = document.createElement("h4");
                        roverNameH4.textContent = `Rover Name: ${filteredResult[i].rover.name}`;
                        roverNameH4.setAttribute('id', 'rover-name');
                        imgMainDiv.append(roverNameH4);

                        const camNameH4 = document.createElement("h4");
                        camNameH4.textContent = `Camera Name: ${filteredResult[i].camera.full_name}`;
                        camNameH4.setAttribute('id', 'camera-name');
                        imgMainDiv.append(camNameH4);
                        const earthDateP1 = document.createElement("p");
                        //earthDateP1.textContent = `Earth Date: ${filteredResult[i].earth_date}`;
                        earthDateP1.textContent = `Earth Date: ${filteredResult[i].earth_date.split('-').reverse().join('/')}`;
                        earthDateP1.setAttribute('id', 'capture-date');
                        imgMainDiv.append(earthDateP1);

                        let imgCollect = document.createElement("img");
                        let imgInsert = filteredResult[i].img_src;
                        imgCollect.setAttribute("src", imgInsert);
                        imgCollect.setAttribute("width", "600");
                        imgCollect.setAttribute("height", "500");
                        imgCollect.setAttribute("class", "rounded mx-auto d-block");
                        imgMainDiv.append(imgCollect);
                        //insert three line break for every result other than the last one
                        if (i < filteredLength - 1 ) {
                        imgMainDiv.append(document.createElement('br'));
                        imgMainDiv.append(document.createElement('br'));
                        imgMainDiv.append(document.createElement('br'));
                        }
                    }
               
                }
                //if no image is available
            } else {
                const camNameH3 = document.createElement("h3");
                camNameH3.textContent = `No image captured on ${earthDate.value}`;
                camNameH3.setAttribute('id', 'zero-img');
                imgMainDiv.append(camNameH3);
            }
            });

    }) //end of getWeather event listenenr

})// end of DOM content loaded main event
    