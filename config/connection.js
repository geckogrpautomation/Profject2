
const Sequelize = require('sequelize');

//Connect to correct database. Input your correct credentials here
const sequelize = new Sequelize('project2', 'root', 'RmkL!CB~x2t>D;Y>%9-B_nnD', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});

sequelize.authenticate().then(() => {  
    console.log(`Successfully connected to project 2`);
}).catch((err) => {
  console.log(`Error when connecting to project 2 ----->  ${err}`);
});



module.exports = sequelize;


    
  
  