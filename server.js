const express = require('express')
const connectDB = require('./config/db')

const app = express()
connectDB()

app.use(express.json({extended: false}))

app.use('/api/users', require('./routes/UserRoutes'))
app.use('/api/auth', require('./routes/AuthenticationRoute'))
app.use('/api/project', require('./routes/ProjectRoutes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT} ...`)
})