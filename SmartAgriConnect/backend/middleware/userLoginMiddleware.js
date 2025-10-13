const userLogin = require('../models/userLoginModel');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        console.log("Received Token:", token);

    }

    if (!token) {
        return res.status(401).json({ msg: "Access denied. No token provided." }); 
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = await userLogin.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(404).json({ msg: "User not found." });
        }

        next();
    } catch (e) {
        return res.status(403).json({ msg: "Invalid or expired token." }); 
    }
};

module.exports = { protect };
