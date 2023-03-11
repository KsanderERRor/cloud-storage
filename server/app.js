const express = require('express')
const mongoose = require('mongoose')


const { PORT, MONGO_URL } = require('./configs/variables')


const app = express()

mongoose.set('debug', true);
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL); 

try {
    app.listen (PORT, () => {
    console.log(`app listen ${PORT}`);
})
} catch (e) {
    // console.log(e);
}
