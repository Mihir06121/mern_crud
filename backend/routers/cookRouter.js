const express = require('express')
const router = express.Router()

const { createCook, getCook, updateCook, deleteCook } = require('../controllers/cookControllers')

router.post('/create-cook', createCook)
router.get('/get-cook', getCook)
router.put('/update-cook', updateCook)
router.delete('/delete-cook/:_id', deleteCook)

module.exports = router