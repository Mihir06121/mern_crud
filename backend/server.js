const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const morgan = require('morgan')
const cors = require("cors")

const app = express()

const cookRouter = require("./routers/cookRouter")

mongoose
    .connect('mongodb://localhost:27017/cook-data', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => {
        console.log(err);
    });

app.use(cors())

app.use(morgan('dev'))
app.use(bodyParser.json());

app.use('/api', cookRouter)

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});