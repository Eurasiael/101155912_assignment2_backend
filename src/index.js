const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const corsMiddleware = require('./cors');

const app = express();

app.use(express.json()); 
app.options('*', corsMiddleware);
app.use(corsMiddleware); 

const api = require('./api');
app.use('/api', api);

const DB_URL = process.env.DB_URL;
mongoose
    .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB connected.');
    })
    .catch(err => {
        console.error(`DB connection Failed: ${err}`);
    });


const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
    console.log(`Listening port: ${PORT}`);
})