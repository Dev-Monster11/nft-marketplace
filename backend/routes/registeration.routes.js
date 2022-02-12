const router = require('express').Router();
const {registerationController} = require('../controller');

// Retrieve all Users
router.get('/', registerationController.findAll);
router.get('/:email', registerationController.findOne);

module.exports = router;
