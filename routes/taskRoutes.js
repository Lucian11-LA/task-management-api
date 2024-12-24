const express = require('express');
const authenticateJWT = require('../middleware/authenticate');
const {createTask ,getTasks, deleteTask } = require('../controllers/taskControllers');

const router = express.Router();

router.post('/', authenticateJWT, createTask);
router.get('/', authenticateJWT, getTasks);
router.put('/:id',authenticateJWT,updateTask)
router.delete('/:id',authenticateJWT,deleteTask)
module.exports = router;