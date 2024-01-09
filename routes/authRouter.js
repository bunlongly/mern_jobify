import { Router } from "express";
const router = Router();
import { login, register } from "../controllers/authController.js";

router.post("/register", register);
router.post("/register", login);

export default router;

