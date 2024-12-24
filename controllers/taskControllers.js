const { where } = require('sequelize');
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

const deleteTask  = async (req, res)=>{
    const  {idTask}  = req.parmas.id;

    if(!idTask){
        return res.status(400).json({message:'O ID e obrigatorio'});
    }

    try{

        const task = await Task.findOne({
            where:{
                id: idTask,
                userId: req.user.id
            }
        });

        if(!task){
            return res.status(404).json({message:"Tarefa nao encontrada"});
        }

        await task.destroy();

        return res.status(200).json({message:"Tarefa excluida com sucess"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:'erro ao excluir a tarefa'});
    }



}

const updateTask = async (req, res)=>{
    const {Task} = require('../models');

    const {id} = req.params;
    const {title, description} = req.body;

    if(!title){
        return res.status(400).json({message:'o titulo e obrigatorio'});
    }

    try{
        const task = await Task.findOne({where:{id, userId: req.user.id}});

        if(!task){
            return res.status(404).json({message:'tarefa nao encontrada!'});
        }

        await task.update({
            title: title,
            description: description
        });

        res.status(200).json(task);

    }catch(error){
        console.log(error);
        res.status(500).json({message:'erro ao editar a tarefa'});
    }
}
module.exports = {createTask, getTasks, deleteTask, updateTask };