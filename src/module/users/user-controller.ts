import { RequestHandler } from "express";
import { createUserSchemaType } from "./dtos/create-user-dto";
import userService from "./user-service";


const signIn: RequestHandler = async (req, res) => {
  try {
    
  } catch (error) {
     
  }
};

const createUser: RequestHandler = async (req, res) => {
  try {
    const { body: userData } = req as createUserSchemaType;

    const newUser = await userService.createUser(userData);

    return res.status(201).json('register success')
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const getUser: RequestHandler = async (req, res) => {
  try {
    const user = await userService.getUser();

    return res.json(user);
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

export default {
  getUser,
  createUser,
};
