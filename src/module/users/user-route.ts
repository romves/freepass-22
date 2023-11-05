import { Router } from "express";

import { validation } from "../../helper/helper";
import { verifyJWT } from "../../middleware/verifyJWT";

import userController from "./user-controller";

import { createUserSchema } from "./dtos/create-user-dto";
import { signInUserSchema } from "./dtos/sign-in-dto";

const router = Router();

router.post("/signup", validation(createUserSchema), userController.signUp);
router.post("/signin", validation(signInUserSchema), userController.signIn);

router.get("/me", verifyJWT, userController.getUserById);
router.patch("/", verifyJWT, userController.updateUser);

router.get("/", verifyJWT, userController.getUser);

export default router;
