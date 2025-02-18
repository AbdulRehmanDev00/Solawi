import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

// Sign Up route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Normalize username and email to lowercase
        const normalizedUsername = username.toLowerCase();
        const normalizedEmail = email.toLowerCase();

        // Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [
                { username: normalizedUsername },
                { email: normalizedEmail }
            ]
        });
        console.log('Existing user:', existingUser); // Debugging
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username or email already exists' });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username: normalizedUsername, email: normalizedEmail, password: hashedPassword });
        await newUser.save();

        // Send confirmation email
        await sendEmail(email, 'Welcome to Solawi', 'Thank you for signing up!');
        await sendEmail('admin@solawi.de', 'New User Signup', `A new user has signed up: ${email}`);

        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Normalize username to lowercase
        const normalizedUsername = username.toLowerCase();

        // Find user by username
        const user = await User.findOne({ username: normalizedUsername });
        console.log('User found:', user); // Debugging
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid); // Debugging
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        res.status(200).json({ success: true, message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
export default router;
