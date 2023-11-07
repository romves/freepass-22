import { Router } from "express";

import { validation } from "../../helper/helper";
import classController from "./class-controller";
import { createClassSchema } from "./dtos/create-class-dto";
import userController from "../users/user-controller";
import { updateClassSchema } from "./dtos/update-class-dto";

const router = Router();

router.post("/", validation(createClassSchema), classController.createClass);
router.get("/:id", classController.getClassById);
router.patch("/:id",validation(updateClassSchema), classController.updateClass);

router.post("/apply", userController.applyClass);
router.post("/cancel", userController.cancelClass);

router.get("/", classController.getAllClasses);
router.delete("/", classController.deleteClass);

export default router;
