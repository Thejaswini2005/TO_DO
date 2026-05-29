const express = require('express');
const cors = require("cors");
const taskRoutes = require('./routes/taskroutes');
const app = express();
app.use(express.json() );
app.use(cors());
app.use('/tasks', taskRoutes);
 app.get('/', (req, res) => {
    res.send('TaskFlow Backend API is running 🚀');
});
module.exports = app;