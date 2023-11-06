import { Router } from "express";

import { validation } from "../../helper/helper";
import classController from "./class-controller";
import { createClassSchema } from "./dtos/create-class-dto";
import userController from "../users/user-controller";

const router = Router();

router.post("/", validation(createClassSchema), classController.createClass);
router.get("/admin", classController.getAllClasses);
router.get("/:id", classController.getClassById);
router.post("/apply", userController.applyClass);

export default router;
