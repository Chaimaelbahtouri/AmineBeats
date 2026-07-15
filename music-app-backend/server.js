const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const songRoutes = require('./routes/Songs')

dotenv.config()
connectDB()

const app = express();
app.use(express.json())
app.use(cors())

app.use("/images", express.static("public/images"));

app.use('/api/auth',authRoutes)
app.use('/api/songs',songRoutes)

app.use('/',(err,req,res,next)=>{
    res.status(500).json({
        message:err.message ||'Server error!'
    })
})

app.listen(process.env.PORT, ()=>{
    console.log(`server running on port ${process.env.PORT}`)
})