import { Router } from "express";
import userController from "./user-controller";
import { validation } from "../../helper/helper";
import { createUserSchema } from "./dtos/create-user-dto";

const router = Router()

router.get('/', userController.getUser)
router.post('/', validation(createUserSchema), userController.createUser)

export default router