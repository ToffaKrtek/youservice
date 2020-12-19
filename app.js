const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
//const bodyParser = require('body-parser');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const locationRouter = require('./routes/location');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI, {useNewUrlParser: true })
    .then( () => console.log("MongoDB connected."))
    .catch( error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(require('cors')())

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/location', locationRouter)


module.exports = app;