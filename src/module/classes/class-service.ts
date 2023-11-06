import prisma from "../../config/prisma";
import { CustomError } from "../../error/custom-error";
import { ClassData } from "../../types/types";

const createClass = async (classData: {
  class_code: string;
  course_id: string;
}) => {
  const existingClass = await prisma.class.findUnique({
    where: { class_code: classData.class_code },
  });

  if (existingClass) throw new CustomError("class already exist", 400);

  return await prisma.class
    .create({
      data: {
        class_code: classData.class_code,
        course: {
          create: {
            course: {
              connect: { course_id: classData.course_id },
            },
          },
        },
      },
    })
    .catch((err) => {
      throw new CustomError(err.message, 500);
    });
};

const getAllClasses = async () => {
  const classes = await prisma.class
    .findMany({
      include: {
        course: {
          select: {
            course: {
              select: {
                course_id: true,
                name: true,
              },
            },
          },
        },
        users: {
          select: {
            user: {
              select: {
                nim: true,
                nama_lengkap: true,
              },
            },
            assignedAt: true,
          },
        },
      },
    })
    .catch((err) => {
      throw new CustomError(err.message, 500);
    });

  if (!classes) throw new CustomError("user not found", 403);

  return classes;
};

const getClassById = async (class_code: string) => {
  const class_1 = await prisma.class
    .findMany({
      where: { class_code },
      include: {
        course: {
          select: {
            course: {
              select: {
                course_id: true,
                name: true,
              },
            },
          },
        },
        users: {
          select: {
            user: {
              select: {
                nim: true,
                nama_lengkap: true,
              },
            },
            assignedAt: true,
          },
        },
      },
    })
    .catch((err) => {
      throw new CustomError(err.message, 500);
    });

  if (!class_1) throw new CustomError("user not found", 403);

  return class_1[0];
};

export default {
  createClass,
  getAllClasses,
  getClassById,
};
