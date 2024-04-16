const Sequelize = require('sequelize');

const sequelize = new Sequelize('userdata', 'root', 'Test@123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
