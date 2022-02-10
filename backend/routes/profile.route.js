const router = require('express').Router();
const {ProfileController} = require('../controller');


// Retrieve all Users
router.post('/', ProfileController.create);




module.exports = router;
