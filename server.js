const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect db
connectDB();
//init middleware
app.use(express.json({ extended: false }));

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/contests', require('./routes/chef'));

//Set Port
const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
