
window.addEventListener("load", function () {

    const startDate = MCDatepicker.create({ 
        el: '#start',
        dateFormat: 'DD-MM-YYYY'
    })

    const endDate = MCDatepicker.create({ 
        el: '#end',
        dateFormat: 'DD-MM-YYYY'
    })

    console.log(startDate);
    console.log(endDate);
}); //End window event listener