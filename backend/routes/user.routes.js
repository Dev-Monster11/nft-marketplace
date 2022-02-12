const router = require('express').Router();
const {userController} = require('../controller');


// Retrieve all Users
router.post('/', userController.create);

router.post('/updateImage', userController.updateImage);

// Retrieve all Users
router.get('/', userController.findAll);

// Retrieve a single User with id
router.get('/:id', userController.findOne);

router.get('/bywallet/:walletAddress', userController.findOneByWalletAddress);

module.exports = router;
