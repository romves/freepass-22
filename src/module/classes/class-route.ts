import { Router } from "express";

import { validation } from "../../helper/helper";
import classController from "./class-controller";
import { createClassSchema } from "./dtos/create-class-dto";

const router = Router();

router.post("/class", validation(createClassSchema), classController.createClass);
router.get("/class/:id", classController.getClassById);
router.get("/class", classController.getAllClasses);

export default router;
