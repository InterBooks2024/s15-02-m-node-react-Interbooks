const wishListServices = require("../services/wishListServices")

const addBookToWishList = async (req, res) => {
    const userId = req.user.id
    const { bookId } = req.body
    try {
        const wishList = await wishListServices.addToWishList(bookId, userId)

        if (wishList.error) {
            return res.status(404).json(wishList)
        }

        res.status(201).json({ wishList })
    } catch (e) {
        res.status(500).json({ error: error.message })
    }
}

const removeBookFromWishList = async (req, res) => {
    const userId = req.user.id
    const { bookId } = req.body
    try {
        const wishList = await wishListServices.removeFromWishList(bookId, userId)

        if (wishList.error) {
            return res.status(404).json(wishList)
        }
        res.status(200).json({ wishList })
    } catch (e) {
        res.status(500).json({ error: error.message })
    }
}

const getUserWishList = async (req, res) => {
    const userId = req.user.id
    try {
        const wishList = await wishListServices.getUserWishList(userId)

        if (wishList.error) {
            return res.status(404).json(wishList)
        }
        res.status(200).json({ wishList })
    } catch (e) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { addBookToWishList, removeBookFromWishList, getUserWishList}