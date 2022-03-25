const express = require('express')
const router = express.Router()

const Record = require('../models/Record')

router.post('/', async (req, res) => {
    const record = new Record(req.body)
    await record.save()
    res.send({status: 'success'})
})

module.exports = router
