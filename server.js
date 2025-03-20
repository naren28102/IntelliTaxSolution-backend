const express = require('express');
const connectDB = require('./config/db');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const ContactRoute = require('./routes/contactRoutes');
const cors = require('cors');  
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is working Properly');
  })

app.use('/api/contact', ContactRoute);


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})