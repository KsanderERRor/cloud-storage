const express = require('express')
const mongoose = require('mongoose');


const { PORT, MONGO_URL } = require('./configs/variables');
const mainRouter = require('./api/api.router');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('debug', true);
mongoose.connect(MONGO_URL);


app.use('/api', mainRouter);


try {
    app.listen(PORT, () => {
        console.log(`app listen ${PORT}`);
    })
} catch (e) {
 
};
