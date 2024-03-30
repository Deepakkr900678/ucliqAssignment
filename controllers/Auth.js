const User = require("../models/User");
require("dotenv").config();

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (
            !name ||
            !email
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const user = await User.create({
            name,
            email,
        });
        return res.status(200).json({
            success: true,
            user,
            message: "User Created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be created.",
        });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            users,
            message: "All users retrieved successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting all users.",
        });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            user,
            message: "User retrieved successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting user by ID",
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "User updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while updating user",
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting user",
        });
    }
}