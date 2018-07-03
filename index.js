'use strict';

require('dotenv').config();

require('babel-register');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
//.catch(err => console.error(err));

require('./src/app.js').start(process.env.PORT);
