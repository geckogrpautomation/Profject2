const datepicker = require('js-datepicker')
let getEventsObj = document.getElementById('get-event');
const start = datepicker('.start', { id: 1 });
const end = datepicker('.end', { id: 1 });



start.getRange() // { start: <JS date object>, end: <JS date object> }
end.getRange()