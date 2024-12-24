const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const registerUser = async (req, res) =>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'});
    }

    try{
        const existingUser = await User.findOne({where:{email}});
        if(existingUser){
            return res.status(400).json({message: 'Usuário já existe!'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({message: 'Usuário criado com sucesso!'});
    }catch(error){
        res.status(500).json({message:'Erro ao registrar'});
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou senha inválidos!' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,  // chave secreta
            { expiresIn: process.env.JWT_EXPIRATION }  // opções do JWT
        );
        
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
};

module.exports= {registerUser, loginUser};