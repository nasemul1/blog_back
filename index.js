import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRouter.js'

// app init
const app = express()

// port and connection to database
const port = process.env.PORT || 4000
connectDB()

// third party middleware
app.use(cors())
app.use(bodyParser.json({ limit: '100mb' }))

// routes
app.get('/', (req, res)=>{
    res.send('Api is working')
})

// api endpoints
app.use('/api/v1/user', userRouter)

app.listen(port, () => {
    console.log('Server is running on port', port)
})