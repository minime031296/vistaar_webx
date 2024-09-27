require('dotenv').config()
const express = require('express')
const {log} = require('console')
const connectToDb = require('./src/config/db')
const userRoutes = require('./src/routes/user.route')
const PORT = process.env.PORT || 3001
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//auth middleware

//user Routes
app.use('/api', userRoutes)





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