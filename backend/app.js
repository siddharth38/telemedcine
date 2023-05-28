const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/covid', {
	useFindAndModify: false,
	useUnifiedTopology: true,
	useNewUrlParser: true
});

mongoose.connection
	.once('open', () => {
		console.log("Mongoose Connected!");
		// Populate messages collection with messages from questions.js
		updateConversationGraph()
		// initializeWeights()
	})
	.on('error', (err) => console.error(err))
	// .on('graphUpdate', () => {


const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const { updateConversationGraph, initializeWeights } = require("./helper/mongo_init");

const app = express();

app.use(
	session({
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		name: 'sid',
		saveUninitialized: false,
		resave: false,
		secret: 'admin',
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 365,
			sameSite: true,
			secure: false
		}
	})
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));
app.use('/api/images', express.static(path.join(__dirname, 'public/images')));

app.use('/api', indexRouter);
app.use('/admin', adminRouter);

module.exports = app;
