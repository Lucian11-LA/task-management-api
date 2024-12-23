const {Sequelize, DataTypes} = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME ,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
   
);

sequelize.authenticate()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

const User = require('./user')(sequelize, DataTypes);
const Task = require('./task')(sequelize, DataTypes);

User.hasMany(Task);
Task.belongsTo(User);

module.exports = { sequelize, User, Task};
