const User = require("../models/User")
const BooksModel = require("../models/BooksModel")
const bcrypt = require("bcrypt")

module.exports.createUser = async ( email, password, username, favoriteGenres, country, postalCode, phoneNumber) =>{
    try{
        const existingUser = await User.findOne({ email})
        if (existingUser){
            return { error : "Email already exists"}
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            password:hashedPassword,
            username,
            favoriteGenres,
            country,
            postalCode,
            phoneNumber
        })
        await newUser.save()
        return { message: "User created succesfully", user: newUser}
    }catch (e) {
        console.log("error when creating user",e)
        return { error : "error when creating user"}
    }
}

module.exports.updateUser = async (id,updateData) =>{
    try{
        const userUpdated = await User.findByIdAndUpdate(id, {$set: updateData},{new:true, runValidators:true})
        if (!userUpdated){
            return { error : "User not found"}
        }

        return userUpdated

    } catch(e){
        console.log("Error updating user",e)
        return { error: "Error updating user"}
    }
}

module.exports.deleteUser = async (id) =>{
    try{
        const user = await User.findByIdAndDelete(id)
        
        if(!user) {
            return { error : "User not found"}
        }

        return { message: "User deleted successfully"}
    } catch (e) {
        console.log("error when deleting user",e)
        return { error : "error when deleting user"}
    }
}

module.exports.addToWishList = async (bookId, userId) =>{
    try{
        const book = await BooksModel.findById(bookId)

        if (!book) {
            return { error : "Book not found"}
        }

        const user = await User.findByIdAndUpdate(
            {_id: userId},
            {$addToSet:{wishList:bookId}},{new:true})
        if (!user) {
            return { error : "User not found"}
        }

        const userUpdated = await User.findById(userId)

        return userUpdated.wishList
    } catch (e) {
        console.log("Error adding book a wishlist",e)
        return { error: "Error adding book a wishlist"}
    }
}