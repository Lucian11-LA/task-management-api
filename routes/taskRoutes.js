const express = require('express');
const authenticateJWT = require('../middleware/authenticate');
const {createTask ,getTasks } = require('../controllers/taskControllers');

const router = express.Router();

router.post('/', authenticateJWT, createTask);
router.get('/', authenticateJWT, getTasks);

module.exports = router;