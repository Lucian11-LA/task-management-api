const { Task } = require('../models');

const createTask = async (req, res) =>{
    const {title, description} = req.body;

    if(!title){
        return res.status(400).json({message: 'O título é obrigatório!'});
    }

    try{
        const task = await Task.create({
            title,
            description,
            userId: req.user.id,
        });
        
        res.status(201).json(task);
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Erro ao criar tarefa!'});
    }
};

const getTasks = async (req, res)=>{
    try{
        const tasks = await Task.findAll({
            where:{userId: req.user.id}
        });

        res.json(tasks);
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Erro ao buscar tarefas!'});
    }
};

module.exports = {createTask, getTasks};