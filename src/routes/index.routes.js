const express = require('express')
const router = express.Router()
const controller = require('../controllers/index.controller')

router.get('/', controller.index)
router.post('/sendDate', controller.addDate)
router.post('/getUser', controller.getUser)

module.exports = router