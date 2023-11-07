import { RequestHandler } from "express";
import { CustomRequest } from "../../middleware/verifyJWT";
import classService from "./class-service";
import { createClassSchemaType } from "./dtos/create-class-dto";
import { updateClassBodyType } from "./dtos/update-class-dto";

const createClass: RequestHandler = async (req, res) => {
  try {
    const { body: classData } = req as createClassSchemaType;

    const newClass = await classService.createClass(classData);

    return res
      .status(201)
      .json({ data: newClass, message: "add course success" });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const getAllClasses: RequestHandler = async (req, res) => {
  try {
    const classes = await classService.getAllClasses();

    return res.json({ data: classes });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const getClassById: RequestHandler = async (req: CustomRequest, res) => {
  try {
    const { id } = req.params;

    const user = await classService.getClassById(id);

    return res.json({ data: user });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const deleteClass: RequestHandler = async (req, res) => {
  try {
    const { class_code } = req.body;

    const deletedClass = await classService.deleteClass(class_code);

    return res.json({ data: deletedClass, message: "delete class success" });
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const updateClass: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id)

    const updateData = req.body as updateClassBodyType;

    const updatedClass = await classService.updateClass(id, updateData);

    return res.json({ data: updatedClass, message: "update class success" });
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

export default {
  getAllClasses,
  getClassById,
  createClass,
  deleteClass,
  updateClass,
};
