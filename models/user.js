
const Sequelize = require('sequelize');
const db = require('../db');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  hashPassword: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
});


module.exports = Users;