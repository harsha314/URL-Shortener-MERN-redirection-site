require('dotenv').config();

exports.API_URL = process.env.API_URL || 'http://localhost:8000/short';

exports.APP_URL = process.env.APP_URL || 'http://localhost:3000/';

exports.PORT = process.env.PORT || 5499;
