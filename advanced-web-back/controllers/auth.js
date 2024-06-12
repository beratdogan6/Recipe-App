import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
    const { username, password, email } = req.body;
    
    try {
        if (username) {
            const oldUser = await User.findOne({ username });
            if (!oldUser) return res.json({ message: "User doesn't exist" });

            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
            if (!isPasswordCorrect) return res.json({ message: "Invalid credentials" });

            res.json({ message: "Login successful", result: oldUser });
        } else if (email) {
            const oldUser = await User.findOne({ email });
            if (!oldUser) return res.json({ message: "User doesn't exist" });

            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
            if (!isPasswordCorrect) return res.json({ message: "Invalid credentials" });

            res.json({ message: "Login successful", result: oldUser });
        } else {
            res.json({ message: "Please provide username or email" });
        }
    } catch (err) {
        res.json({ message: "Something went wrong" });
    }
}

export const register = async (req, res) => {
    const { email, password, name, surname, username, gender } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) return res.json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name, surname, username, gender });

        res.json({ message: "Registration successful", result });
    } catch (error) {
        res.json({ message: "Something went wrong", error });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ result: user });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}
