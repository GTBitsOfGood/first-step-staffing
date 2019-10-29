var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose')
var app = express();
var cors = require("cors");
require('dotenv').config();

if (app.get('env') === 'development') {
    const whiteList = ['*']
    const corsOptions = {
        origin: function (origin, callback) {
            if (whiteList.indexOf(origin)  == -1 || !origin) {
                callback(null, true)
            } else {
                console.log(origin)
                callback(new Error("Not allowed by CORS"))
            }
        }
    }
    app.use(cors(corsOptions))
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);




// app.use(express.static(path.join(__dirname, 'public')));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB")
  });

// Start server to serve endpoints
console.log('Express started. Listening on port', process.env.PORT || 5000);
app.listen(process.env.PORT || 5000);

// Render React page
app.use(express.static(path.join(__dirname, "../client/build/")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

function handleError(err, req, res, next) {
    const statusCode = err.statusCode ? err.statusCode : 500
    const message = err.message ? err.message : 'Something broke!'
    console.error(err.stack)
    res.status(statusCode).send(message)
  }

app.use(handleError)



module.exports = app;
