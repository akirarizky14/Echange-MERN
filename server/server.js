const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bankRoutes = require('./routes/bankRoutes');
const bankAdminRoutes = require('./routes/bankAdminRoutes');
const profileRoutes = require('./routes/profileRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const exchangeeRoutes = require('./routes/exchangeeRoutes');
const historyRoutes = require('./routes/historyRoutes');
const historyAdminRoutes = require('./routes/historyAdminRoutes')
app = express();
require('dotenv').config()
const PORT = process.env.PORT
const Mongodb = process.env.MONGO_URL
const cors = require('cors');
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })
app.use(express.json());
app.get('/', function(req, res){
    res.send("success")
})
app.use('/api/users', userRoutes)
app.use('/api/bank', bankRoutes)
app.use('/api/bankAdmin', bankAdminRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/exchange', exchangeRoutes)
app.use('/api/exchangee', exchangeeRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/historyAdmin', historyAdminRoutes)

mongoose.connect(Mongodb)
    .then(() =>{
        app.listen(PORT,()=>{
            console.log(`listening in port ${PORT}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
