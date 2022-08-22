import { Router } from "express";
import { UserController } from "../controllers";

const router = Router();

router.post("/new", UserController.setUser);

export default router;
