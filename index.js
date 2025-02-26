import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import connectDB from './config/mongodb.js'

const app = express()

const port = process.env.PORT || 4000
connectDB()

app.use(cors())
app.use(bodyParser.json({ limit: '100mb' }))

app.get('/', (req, res)=>{
    res.send('Api is working')
})

app.listen(port, () => {
    console.log('Server is running on port', port)
})