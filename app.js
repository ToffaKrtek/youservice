const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI, {useNewUrlParser: true })
    .then( () => console.log("MongoDB connected."))
    .catch( error => console.log(error))

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)


module.exports = app;