const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")

router.post("/user/register",userControllers.userRegister)
router.patch("/user/edit/:id", userControllers.userUpdate)
router.delete("/user/delete/:id", userControllers.userDelete)
router.get('/user/get/:id', userControllers.getUserData)


module.exports = router