import { RequestHandler } from "express";
import { CustomRequest } from "../../middleware/verifyJWT";
import classService from "./class-service";
import { createClassSchemaType } from "./dtos/create-class-dto";

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
    const user = await classService.getAllClasses();

    return res.json({ data: user });
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

const updateUser: RequestHandler = async (req, res) => {};

export default {
  getAllClasses,
  getClassById,
  createClass,
};
