const Users = require('./user');
const Notes = require('./notes');


Users.hasMany(Notes);
Notes.belongsTo(Users);

Users.sync().then(() => {
    console.log('Users table created');
  });

Notes.sync().then(() => {
    console.log('Notes table created');
  }); 

module.exports = {Users, Notes}