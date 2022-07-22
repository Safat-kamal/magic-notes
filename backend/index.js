require('dotenv').config();
require('./db');
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8000;

//Middleware
app.use(cors())
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'));
  });
  // Available Routes
  app.use('/api/auth',require('./routes/auth'));
  app.use('/api/notes',require('./routes/notes'));

 }
// // Available Routes
// app.use('/api/auth',require('./routes/auth'));
// app.use('/api/notes',require('./routes/notes'));

// app.get('/', (req, res) => {
//   res.send('Welcome to Magic Notes!')
// })

app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});