const express = require('express');
const dotenv = require('dotenv');
const usersRoutes = require('./routes/userRoutes');
const tasksRoutes  = require('./routes/taskRoutes');
const { sequelize } = require('./models');
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users',usersRoutes);
app.use('/api/tasks', tasksRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () =>{
        console.log(`Servidor rodando na porta ${PORT}`)
    })
})