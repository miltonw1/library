import express from 'express'

import bodyParser from 'body-parser'
import routes from './routes/index.js'

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(routes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})