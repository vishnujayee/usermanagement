const { default: mongoose } = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Limit = 10;
const addRole = async(req,res) => {
    const {name,email ,role} = req.body;
        try {
        let user = await User.findOne({email:email});
        if(!user) return res.status(400).json({message:"Invalid User"});
        let roles = user.roles;
        if(!roles.includes(role)) {
            roles.push(role);
        }
        await user.save();
        return res.status(200).json({message:"Succesfully Added the role"});
        } catch (error) {
            return res.status(400).json({message:"Error in Adding roles"})
        }
}

// this is basic pagination based on offset and limit we can improve this by using other pagination methods like cursor;
// we dont want to send all data of user only need name and email for that we make a Class User constructor;

const getAllUsers = async(req,res) => {
    let pageNo = parseInt(req.query.pageNo);
    if(!pageNo || pageNo == 0) pageNo = 1;
    let userToSkip = pageNo * 10;
    try {
        let users = await User.find().skip(userToSkip).limit(Limit);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({message:"Error in Fetching Users"});
    }
}

const getUserInfo = async(req,res) => {
    let userId = mongoose.Types.ObjectId(req.params.id);
    if(!userId) return res.status(400).json({message:"Invalid UserID"});
    try {
        let user = await User.findOne({_id:userId});
        if(!user) return res.status(400).json({message:"User does't Exist"});
        return res.status(200).json(user);
    } catch (error) {
        
    }
}

const updateUserInfo = async(req,res) => {
    const {name, email ,password} = req.body;
    let userId = mongoose.Types.ObjectId(req.user.id);
    if(!userId) return res.status(400).json({message:"Invalid UserID"});
    try {
        let user = await User.findOne({_id:userId});
        if(!user) return res.status(400).json({message:"User does't Exist"});
        user.name = name;
        user.email = email;
        user.password = await bcrypt.hash(password,12);
        await user.save();
        return res.status(200).json({message:"UserInfo Updated"});
    } catch (error) {
        return res.status(400).json({message:"UserInfo Updataion Failed"});
    }
}

const deleteUser = async(req,res) => {
    let userId = mongoose.Types.ObjectId(req.params.id);
    if(!userId) return res.status(400).json({message:"Invalid UserID"});

    try {
        let user = await User.findOne({_id:userId});
        if(!user) return res.status(400).json({message:"User does't Exist"});
        user.userStatus = false;
        await user.save();
        return res.status(200).json({message:"User Deleted"});
    } catch (error) {
        return res.status(400).json({message:"Failed to Delete User"});
    }
}

module.exports = {deleteUser, updateUserInfo , getAllUsers ,getUserInfo,addRole};




