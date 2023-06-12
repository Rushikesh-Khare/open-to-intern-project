const express = require('express');
const app = express();
const dotenv = require('dotenv')
const routes = require('../routes/router');
const mongoose = require('mongoose');
app.use(express.json());
app.use('/', routes);
dotenv.config();

mongoose.connect(process.env.URI_CONNECT).then(() => console.log('Database is connected...')).catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})

