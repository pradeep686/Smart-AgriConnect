const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv').config();
const db = require('./config/db');
const userLogin = require('./router/userLoginRouter');
const userAddress = require('./router/userAddressRoute');
const authRoutes = require('./router/authRoutes');
const subsideRoute=require('./router/subsidiesRoutes')
const PORT = process.env.PORT || 9010;
const cropInsightRoute=require('./router/cropInsightRoutes')
const pesticideController=require('./router/pesticidesController')
const fertilizerController=require('./router/fertilizerRouter')
const allowedPorts = [5173, 5174];

app.use(cors({
    origin: allowedPorts.map(port => `http://localhost:${port}`),
    credentials: true 
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path);
    next();
});

app.use('/userLogin', userLogin);
app.use('/userAddress', userAddress);
app.use('/api/auth', authRoutes);
app.use('/api/subsidie',subsideRoute)
app.use('/api/cropInsight',cropInsightRoute)
app.use('/api/pesticide',pesticideController)
app.use('/api/fertilizer',fertilizerController)

app.get('/', (req, res) => {
    return res.json({ msg: "hi" });
});

try{
app.listen(PORT, () => {
    console.log("App is running on port: " + PORT);
    db();
});
}
catch(e){
    console.log(e.message)
}
