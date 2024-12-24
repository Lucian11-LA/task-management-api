const express = require('express');
const authenticateJWT = require('../middleware/authenticate');
const {createTask , getTask} = require('../controllers/taskController');

const router = express.Router();

router.post('/', authenticateJWT, createTask);
router.get('/', authenticateJWT, getTask);

module.exports = router;