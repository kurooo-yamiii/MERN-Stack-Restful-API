require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const productWorkouts = require('./routes/product')

// express app
const app = express();

app.use(express.json())
// routes 
app.use('/api/product', productWorkouts)

// picture uploading
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
    console.log('Connected on DB listening on port 4000')
})
})
.catch((error) => {
    console.log(error)
})

