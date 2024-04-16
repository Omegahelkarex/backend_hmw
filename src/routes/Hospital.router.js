import { Router } from "express";
import {
  hospitalLogin,
  logoutHospital,
  registerHospital,
} from "../controllers/Hospital.controller.js";
import {
  verifyHospitalJWT,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const hospitalRouter = Router();

hospitalRouter.route("/register").post(upload.single("logo"), registerHospital);
hospitalRouter.route("/login").post(hospitalLogin);
hospitalRouter.route("/logout").post(verifyHospitalJWT, logoutHospital);

export default hospitalRouter;
