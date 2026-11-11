const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const handleSignup = async(req,res) => {
    const {name ,email , password} = req.body;
    try {
        let existingUser = await User.findOne({email:email});
        if(existingUser) {
            return res.status(400).json({
                message:"User Already Existed",
            })
        }
        let hashedPassword = await bcrypt.hash(password,12);
        const user = await User.create({name:name,email:email,password:hashedPassword});
        return res.status(201).json({message:'User Created'});
    } catch (error) {
        return res.status(400).json({message:"Failed to Create User"});
    }
}

const handleLogin = async(req,res) => {
const {email, password} = req.body;
try {
    let user = await User.findOne({email:email});
    
        if(!user) {
            return res.status(400).json({
                message:"User Not Found",
            })
        }
        let passwordMatch = await bcrypt.compare(password,existingUser.password);
        if(!passwordMatch) return res.status(400).josn({message:"Invalid Credentials"});
        const token = generateTokens(user);
        existingUser.refreshToken = token.rerefreshToken;
        await user.save();
        res.status(200).json(token);
} catch (error) {
    return res.status(400).json({message:"Login Failed"});
}
}
const getAcessToken = async(req,res) => {
    const refreshToken = req.header('RefreshToken');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        let userId =  mongoose.Types.ObjectId(decoded.id);
        let user = await User.findOne({_id: userId});
        if(!user || user.refreshToken !== refreshToken) return res.status(400).json({message:"Invaild Token Need to Login"});
        let token = generateTokens(user);
        await user.save();
        return res.status(200).json(token);
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
module.exports = {
    handleSignup, handleLogin, getAcessToken
}