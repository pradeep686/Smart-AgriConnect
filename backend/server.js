const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv').config();
const db = require('./config/db');
const userLogin = require('./router/userLoginRouter');
const userAddress=require('./router/userAddressRoute')
const PORT = process.env.PORT || 9009;

app.use(cors());
app.use(express.json());

// Middleware to log request paths
app.use((req, res, next) => {
    console.log(req.path);
    next();
});

// Route for user login
app.use('/userLogin', userLogin);

app.use('/userAddress',userLogin)

// Default route
app.get('/', (req, res) => {
    return res.json({ msg: "hi" });
});

// Start the server
app.listen(PORT, () => {
    console.log("App is running on port: " + PORT);
    db();
});
