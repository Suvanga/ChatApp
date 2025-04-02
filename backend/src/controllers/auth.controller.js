import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";    
import bcrypt from 'bcryptjs';
  
export const signup = async(req, res) => {
    const { fullName,email,password } = req.body; 
    try {
            // console.log(password)
            //hash password with bcrypt js
            if(!fullName || !email || !password)
            {
                return res.status(400).json({message: 'All fields are required'});
            }
            
        if(password.length < 6)
            {
            return res.status(400).json({message: 'Password must be at least 6 characters'});
        }   

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            return res.status(201).json({
                _id:newUser._id,
                 fullName:newUser.fullName,
                 email:newUser.email,
                 password:newUser.password,
                 profilePic:newUser.profilePic,
                });
        }else{
            return res.status(400).json({message: 'Invalid User Data'});
        }

    } catch (error) {
        console.log('Error while signing up', error.message);
        res.status(500).json({message: 'Internal server error'});       
    }

};

export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
            const user =await User.findOne({email});
        
            if(!user)
            {
                return res.status(404).json({message: 'invalid credentials'});
            }
        const isPasswordCorrect  = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect)
        {
            return res.status(400).json({message: 'incorrect password'});
        }   
        generateToken(user._id,res);
        return res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        });
    } catch (error) {
        console.log('Error while logging in', error.message);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const logout = (req, res) => {
 try {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message: 'Logged out successfully'});
 } catch (error) {
    
 }
}

export const updateProfile  = async (req, res) => {
    try {
        const  {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic)
        {
            return res.status(400).json({message: 'Profile pic is required'});
        }   
const uploadResponse =    await cloudinary.uploader.upload(profilePic);
const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url},{new:true});

res.status(200).json(updatedUser);
    }
    
    catch (error) {
        console.log('Error while updating profile', error.message);
        res.status(500).jsson({message: 'Internal server error'});
    }
}   