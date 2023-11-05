import { RequestHandler } from "express";
import { createUserSchemaType } from "./dtos/create-user-dto";
import userService from "./user-service";
import { CustomRequest } from "../../middleware/verifyJWT";

const signIn: RequestHandler = async (req, res) => {
  try {
    const { nim, password }: { nim: string; password: string } = req.body;

    const token = await userService.signIn(nim, password);

    res.cookie("jwt", token.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      token: token.accessToken,
      message: "login success",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const signUp: RequestHandler = async (req, res) => {
  try {
    const { body: userData } = req as createUserSchemaType;

    await userService.createUser(userData);

    return res.status(201).json({ message: "register success" });
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const getUser: RequestHandler = async (req, res) => {
  try {
    const user = await userService.getUser();

    return res.json({ data: user });
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const getUserById: RequestHandler = async (req: CustomRequest, res) => {
  try {
    const nim = req.nim;

    const user = await userService.getUserById(nim);

    return res.json({data: user});
  } catch (error: any) {
    return res.status(error.statusCode).json({ message: error.message });
  }
};

const updateUser: RequestHandler = async (req, res) => {};

export default {
  getUser,
  signUp,
  signIn,
  updateUser,
  getUserById
};
