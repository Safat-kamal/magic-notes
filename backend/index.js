require('dotenv').config();
require('./db');
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8000;

//Middleware
app.use(cors())
app.use(express.json());

// // Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Welcome to Magic Notes!')
})

app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});