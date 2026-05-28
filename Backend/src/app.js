const express = require('express');
const cors = require("cors");
const taskRoutes = require('./routes/taskroutes');
const app = express();
app.use(express.json() );
app.use(cors());
app.use('/tasks', taskRoutes);
 
module.exports = app;