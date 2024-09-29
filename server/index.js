require('dotenv').config()
const express = require('express')
const {log} = require('console')
const connectToDb = require('./src/config/db')
const userRoutes = require('./src/routes/user.route')
const PORT = 3000
const app = express()
const cors = require('cors')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cors middleware

const corsOption = {
    origin: ['http://localhost:3001', 'https://vistaar-webx.vercel.app'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption))

//app.use((req, res, next) => {
//    console.log(`Received request: ${req.method} ${req.url}`);
//    next();
//});


//user Routes
app.use('/api', userRoutes)

app.get('/', (req, res) => {
    return res.send('<h1>Welcome to the server side </h1>')
})

//server + database details 
app.listen(PORT, async() => {
        try {
            await connectToDb(process.env.MONGO_URI)
            log(`Database is connected`)
        } catch (error) {
            console.error(`Database is not connected: ${error.message}`)
        }
        log(`server is running at port: ${PORT} `)
})  