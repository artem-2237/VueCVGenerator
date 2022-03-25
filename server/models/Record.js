const mongoose = require('mongoose')
const { Schema } = mongoose

const Record = new Schema({
    text: String,
})

module.exports = mongoose.model('Record', Record)
