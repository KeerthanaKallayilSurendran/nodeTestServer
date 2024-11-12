const express = require('express')
const userController = require('../Controller/userController')
const jwtMiddlware = require('../Middleware/jwtMiddleware')
const router = new express.Router

router.post('/register',userController.registerController)
router.post('/login', userController.loginController)
router.get('/viewuser', jwtMiddlware,userController.userViewController)
router.get('/viewUserDetails', jwtMiddlware,userController.userDetailViewController)


module.exports = router