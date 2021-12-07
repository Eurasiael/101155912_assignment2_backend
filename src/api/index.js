const express = require('express');
const app = express();
const v1_employee = require('./employee/employee');

app.use('/v1', v1_employee);

module.exports = app;
