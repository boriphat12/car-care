import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken'
import { authenticationToken } from "../middleware/authMiddleware.js";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

const router = express.Router();

router.get('/me', authenticationToken, async (req, res) => {
    try{
        const user = await User.findById(req.userId).select('-password');
        if(!user) {
            res.status(404).json({error: 'User not found'});
        }
        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

router.post('/register' ,async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({error: "email is already in use"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword});
        const savedUser = await user.save();
        const token = jwt.sign(
            {id: savedUser._id, email: savedUser.email},
            JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.status(201).json({
            token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        })
    } catch (error) {
        res.status(500).json({error: 'Something went wrong'});
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({error: "Invalid email or password"});
            return;
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);
        if(!passwordCorrect) res.status(401).json({error: 'Invalid email or password'});

        const token = jwt.sign({id: user._id, email: user.email}, JWT_SECRET, {
            expiresIn: '7d',
        });
        res.json({token, user: {
            id: user._id,
            name: user.name,
            email: user.email
        }})
    } catch (error) {
        res.status(500).json({error: "Something went wrong"});
    }
    

})

export default router;