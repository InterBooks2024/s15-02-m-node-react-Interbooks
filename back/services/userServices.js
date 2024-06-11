const User = require("../models/User")
const bcrypt = require("bcrypt")

const createUser = async (email, password, username, favoriteGenres, country, postalCode, phoneNumber) => {
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return { error: "Email already exists" }
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            favoriteGenres,
            country,
            postalCode,
            phoneNumber
        })
        await newUser.save()
        return { message: "User created succesfully", user: newUser }
    } catch (e) {
        console.log("error when creating user", e)
        return { error: "error when creating user" }
    }
}

const getUserData = async (id) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            return { error: "User not found" }
        }
        return user
    } catch (e) {
        console.log("Error getting user data", e)
        return { error: "Error getting user data" }
    }
}

const updateUser = async (id, updateData) => {
    try {
        const userUpdated = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true })
        if (!userUpdated) {
            return { error: "User not found" }
        }

        return userUpdated

    } catch (e) {
        console.log("Error updating user", e)
        return { error: "Error updating user" }
    }
}

const deleteUser = async (id) => {
    try {
        const user = await User.findOneAndDelete({_id: id})

        if (!user) {
            return { error: "User not found" }
        }

        return { message: "User deleted successfully" }
    } catch (e) {
        console.log("error when deleting user", e)
        return { error: "error when deleting user" }
    }
}

module.exports = { createUser, updateUser, deleteUser, getUserData}