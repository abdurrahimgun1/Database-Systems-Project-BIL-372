const { Sequelize } = require('sequelize');

const db = new Sequelize('mysql://root:mA20030721*@localhost:3006/bil372', {
  define: { freezeTableName: true },
});

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = db;