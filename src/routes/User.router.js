import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()
// router.post("/test",(req,res)=>res.send("tushar"))
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)

export default router