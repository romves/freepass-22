import prisma from "../../config/prisma";
import { CustomError } from "../../error/custom-error";
import * as bcrypt from "bcrypt";

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

export default {
  createUser,
  getUser,
};
