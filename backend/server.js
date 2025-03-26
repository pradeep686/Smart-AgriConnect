const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv').config();
const db = require('./config/db');
const userLogin = require('./router/userLoginRouter');
const userAddress = require('./router/userAddressRoute');

const PORT = process.env.PORT || 9009;

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path);
    next();
});

app.use('/userLogin', userLogin);
app.use('/userAddress', userAddress);

app.get('/', (req, res) => {
    return res.json({ msg: "hi" });
});

app.listen(PORT, () => {
    console.log("App is running on port: " + PORT);
    db();
});
