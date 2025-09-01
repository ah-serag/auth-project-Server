
const express = require('express')
const router = express.Router()
const userControll = require("../controlles/usersControlls")
const verifyJwt = require('../middleWare/VerifyJwt')

router.use(verifyJwt)
router.route('/getAllUsers').get(userControll.getALlUsers)



module.exports = router















