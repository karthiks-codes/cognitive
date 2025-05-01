const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const registerUser = async (req, res)=>{
    try{
        const {username,email, password, fieldOfStudy} = req.body;
        console.log(username, password, fieldOfStudy)
        // Check if user already exists
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        // Create new user
        const newUser = new User({
            username,
            email,
            password,
            fieldOfStudy
        });
        await newUser.save();
        // Send response
        return res.json({msg:"created", userId: newUser._id})
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
}


const loginUser = async (req, res)=>{
    try{
        const {email, password} = req.body;
        console.log(email, password)

        // Check if user exists
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        // Check password
        const isPasswordValid = await bcryptjs.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        // Send response
        return res.json({msg:"logged", userId: existingUser._id})
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {
    registerUser,
    loginUser
}