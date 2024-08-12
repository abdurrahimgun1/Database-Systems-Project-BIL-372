const { Sequelize } = require('sequelize');

const db = new Sequelize('mysql://root:<sifre>@localhost:<port>/bil372', {
  define: { freezeTableName: true },
});

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = db;
