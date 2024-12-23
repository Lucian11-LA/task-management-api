const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersRoutes = require('./routes/usersRoutes');
const taskRoutes = require('./routes/tas(kRoutes');

dotenv.config();

const app= express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {userNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>console.log('Conectado ao mongodb'))
    .catch((err)=> console.log('erro ao conectar ao MongoDB: ',err));

app.use('/api/users', usersRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`) )
