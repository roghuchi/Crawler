const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv/config');
const bodyParser = require("body-parser");

dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


app.get('/', (req, res) => {
    res.send('This is home page.')
})

//Import Routes
const searchRouter = require('./search/routes/search.route');
app.use('/search', searchRouter);


app.listen(5000, () => console.log("Server is running."))