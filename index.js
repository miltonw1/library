import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes/index.js'
import getDBClient from './database/index.js'

const app = express()
const port = 3001

app.use(bodyParser.json());
app.use(cors())

getDBClient()
    .then(db => {
        app.use(routes(db));
        
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })


