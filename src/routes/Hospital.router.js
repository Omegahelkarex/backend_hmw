import { Router } from "express";
import { hospitalLogin, logoutHospital, registerHospital } from "../controllers/Hospital.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";




const hospitalRouter = Router()

hospitalRouter.route("/register").post(registerHospital)
hospitalRouter.route("/login").post(hospitalLogin)
hospitalRouter.route("/logout").post(verifyJWT, logoutHospital)







export default hospitalRouter