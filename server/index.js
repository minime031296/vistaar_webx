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
    origin: ['https://vistaar-webx.vercel.app', "http://localhost:3001/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption))

app.post('/api/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://vistaar-webx.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true'); 
    
    res.json({ message: 'Login successful' });
});


//app.use((req, res, next) => {
//    console.log(`Received request: ${req.method} ${req.url}`);
//    next();
//});


//user Routes
app.use('/api', userRoutes)

app.get('/', (req, res) => {
    return res.json("Welcome to the server api")
})

//server + database details 
app.listen(PORT, async() => {
        try {
            await connectToDb(process.env.MONGO_URI)
            log(`Databse is connected`)
        } catch (error) {
            console.error(`Database is not connected: ${error.message}`)
        }
        log(`server is running at port: ${PORT} `)
})  