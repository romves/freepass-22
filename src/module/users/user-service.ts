import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import prisma from "../../config/prisma";
import { CustomError } from "../../error/custom-error";
import { updateUserBodyType } from "./dtos/update-user.dto";

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

const applyClass = async (class_code: string, nim: string) => {
  const class_1 = await prisma.class.findUnique({ where: { class_code } });

  if (!class_1) throw new CustomError("class not found", 404);

  const applied = await prisma.user.update({
    where: { nim },
    data: {
      classes: {
        create: {
          class: {
            connect: { class_code },
          },
        },
      },
    },
  });

  return applied;
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

const updateUser = async (
  nim: string,
  { nama_lengkap, password }: updateUserBodyType
) => {
  const existingUser = await getUserById(nim);

  if (!existingUser) throw new CustomError("user not found", 403)

  return await prisma.user.update({
    where: { nim },
    data: {
      nama_lengkap: nama_lengkap || existingUser.nama_lengkap,
    },
  });
};

export default {
  createUser,
  getUser,
  signIn,
  getUserById,
  applyClass,
  updateUser,
};
