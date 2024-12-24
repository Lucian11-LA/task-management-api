const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) =>{
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Acesso negado token não fornecido'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.status(403).json({message:'Token invalido!'})
        }

        
        req.user = user
        next();
    });
};

module.exports = authenticateJWT;