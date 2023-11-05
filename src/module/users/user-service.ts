import prisma from "../../config/prisma";
import { CustomError } from "../../error/custom-error";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const createUser = async (userData: {
  nim: string;
  password: string;
  nama_lengkap: string;
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { nim: userData.nim },
  });

  if (existingUser) throw new CustomError("user already exist", 400);

  const hashedPass = await bcrypt.hash(userData.password, 10);

  // const newUser = {
  //   nama_lengkap: userData.nama_lengkap,
  //   nim: userData.nim,
  //   password: hashedPass,
  //   role: "STUDENT",
  // };

  return await prisma.user.create({
    data: {
      nama_lengkap: userData.nama_lengkap,
      nim: userData.nim,
      password: hashedPass,
      role: "STUDENT",
    },
  });
};

const getUser = async () => {
  const user = await prisma.user.findMany({
    select: {
      nama_lengkap: true,
      nim: true,
    },
  });

  if (!user) throw new CustomError("user not found", 403);

  return user;
};

const getUserById = async (nim: string) => {
  const user = await prisma.user.findUnique({
    where: { nim },
    select: {
      nama_lengkap: true,
      nim: true,
    },
  });

  if (!user) throw new CustomError("user not found", 403);

  return user;
};

const signIn = async (nim: string, password: string) => {
  const foundUser = await prisma.user.findUnique({ where: { nim } });

  if (!foundUser) throw new CustomError("invalid nim or password", 400);

  const isMatch = await bcrypt.compare(password, foundUser.password);

  if (!isMatch) throw new CustomError("invalid nim or password", 400);

  try {
    const accessToken = jwt.sign(
      { nama_lengkap: foundUser.nama_lengkap, sub: nim },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      }
    );

    const refreshToken = jwt.sign(
      { nama_lengkap: foundUser.nama_lengkap, sub: nim },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      }
    );

    await prisma.user.update({
      where: { nim },
      data: { refresh_token: refreshToken },
    });

    return { accessToken, refreshToken };
  } catch (error: any) {
    throw new CustomError(error.message, 400);
  }
};

export default {
  createUser,
  getUser,
  signIn,
  getUserById
};
