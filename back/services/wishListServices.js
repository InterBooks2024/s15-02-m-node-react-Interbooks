const User = require("../models/User")
const BooksModel = require("../models/BooksModel")
const { isValidObjectId } = require('mongoose')

const addToWishList = async (bookId, userId) => {
    try {
        if (!isValidObjectId(bookId)) {
            return { error: "Book not found" }
        }

        const book = await BooksModel.findById(bookId)

        if (!book) {
            return { error: "Book not found" }
        }

        const user = await User.findByIdAndUpdate(
            { _id: userId },
            { $addToSet: { wishList: bookId } }, { new: true })
        if (!user) {
            return { error: "User not found" }
        }

        return user.wishList
    } catch (e) {
        console.log("Error adding book a wishlist", e)
        return { error: "Error adding book a wishlist" }
    }
}

const removeFromWishList = async (bookId, userId) => {
    try {
        if (!isValidObjectId(bookId)) {
            return { error: "Book not found" }
        }

        const book = await BooksModel.findById(bookId)

        if (!book) {
            return { error: "Book not found" }
        }

        const userUpdated = await User.updateOne(
            { _id: userId },
            { $pull: { wishList: bookId } }
        )
        if (!userUpdated) {
            return { error: "Error searching user" }
        }

        return userUpdated.wishList
    } catch (e) {
        console.log("Error deleting book of the wishList", e)
        return { error: "Error deleting book of the wishList" }
    }
}

const getUserWishList = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            return { error: "User not found" }
        }
        return user.wishList
    } catch (e) {
        console.log("Error getting the user wishList")
        return { error: "Error getting the user wishList" }
    }
} 

module.exports = { addToWishList , removeFromWishList , getUserWishList}