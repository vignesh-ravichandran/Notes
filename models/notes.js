
const Sequelize = require('sequelize');
const db = require('../db');

const Notes = db.define('notes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  title: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.STRING
  }
});


module.exports = Notes;