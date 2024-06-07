const express = require("express")
const router = express.Router()
const wishListControllers = require("../controllers/wishListControllers")
const passport = require('../middlewares/auth.middlewares');


router.post("/user/add-to-wishlist", passport.authenticate("jwt", { session: false }), wishListControllers.addBookToWishList)
router.delete("/user/remove-from-wishlist", passport.authenticate("jwt", { session: false }), wishListControllers.removeBookFromWishList)
router.get("/user/get-wishlist", passport.authenticate("jwt", { session: false }), wishListControllers.getUserWishList)

module.exports = router