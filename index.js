import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
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
app.use(express.json({ limit: '500mb' }))
app.use(bodyParser.json({ limit: '500mb', extended: true }))
app.use(morgan('dev'))

// routes
app.get('/', (req, res)=>{
    res.send('Api is working')
})

// api endpoints
app.use('/api/v1/user', userRouter)

app.listen(port, () => {
    console.log('Server is running on port', port)
})