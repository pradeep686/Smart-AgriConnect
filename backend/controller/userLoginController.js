const information = require('../models/userLoginModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '30d' });
};

const create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" }); 
        }

        const checkUserExist = await information.findOne({ email });
        if (checkUserExist) {
            return res.status(409).json({ msg: "User already exists" }); 
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await information.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            msg: "User registered successfully",
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
        });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" }); 
        }

        const checkUserExist = await information.findOne({ email });
        if (!checkUserExist) {
            return res.status(404).json({ msg: "User not found. Please register." }); 
        }

        const checkPass = await bcrypt.compare(password, checkUserExist.password);
        if (!checkPass) {
            return res.status(401).json({ msg: "Invalid password. Try again." }); 
        }

        return res.status(200).json({
            msg: "Login successful",
            token: createToken(checkUserExist.id),
            user: { id: checkUserExist.id, name: checkUserExist.name, email: checkUserExist.email },
        });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const me = async (req, res) => {
    try {
        return res.status(200).json({ name:req.user.name });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email, password, newPassword } = req.body;
        if (!email || !password || !newPassword) {
            return res.status(400).json({ msg: "Please enter all fields" }); 
        }

        const checkUserExist = await information.findOne({ email });
        if (!checkUserExist) {
            return res.status(404).json({ msg: "User not found. Please register." });
        }

        const checkPass = await bcrypt.compare(password, checkUserExist.password);
        if (!checkPass) {
            return res.status(401).json({ msg: "Incorrect password. Try again." }); 
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        checkUserExist.password = hashedPassword;

        await checkUserExist.save(); 
        return res.status(200).json({ msg: "Password reset successfully" });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = { create, login, me, forgotPassword };
