var express = require('express')
const app = express()
const cors = require('cors')


// router import
const notionRouter = require('./routes/notion')


app.use(cors())
app.use(express.json())
app.use(cors())
app.use(
    express.urlencoded({
        extended: true
    })
)


app.use('/notion', notionRouter)

const port = 3001



app.listen(port, () => [
    console.log("Express Listening: ", port)
])