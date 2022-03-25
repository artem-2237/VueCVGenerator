const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.set('port', 3000)

app.use(express.json())
app.use(express.static('dist'))
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use('/api/test', require('./routes/records'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '../dist/index.html')
    console.log('send')
})

async function start() {
    try {
        await mongoose.connect('mongodb+srv://panimayu:artem2237@cluster0.6h3wo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true})
        console.log('[OK] Database is connected')
        app.listen(app.get('port'), () => {
            console.log(`[OK] Server has been started on localhost:${app.get('port')}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()
