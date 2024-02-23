const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config()
const cors = require('cors');

const PORT = process.env.PORT || 5000

const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');

//Connect to database
connectDB()

const app = express()

// Enable CORS for all routes
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(errorHandler)

app.get('/api', (req, res) => {
    res.status(200).json({ message: "=== Welcome to Oswald's Curio Outlet API ===" })
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/data', require('./routes/dataRoutes'))
app.use('/api/db', require('./routes/dbRoutes'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))