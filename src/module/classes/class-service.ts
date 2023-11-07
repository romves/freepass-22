import prisma from "../../config/prisma";
import { CustomError } from "../../error/custom-error";
import { updateClassBodyType } from "./dtos/update-class-dto";

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
  if (!classes) throw new CustomError("class not found", 403);

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

  if (!class_1) throw new CustomError("class not found", 403);

  return class_1[0];
};

const deleteClass = async (class_code: string) => {
  const class_1 = getClassById(class_code);

  if (!class_1) throw new CustomError("class not found", 404);

  await unassignClassfromCourse(class_code).catch((err) => {
    throw new CustomError(err.message, 500);
  });

  const deletedClass = await prisma.class
    .delete({
      where: { class_code },
    })
    .catch((err) => {
      throw new CustomError(err.message, 500);
    });

  return deletedClass;
};

const unassignClassfromCourse = async (class_code: string) => {
  const relatedCourses = await prisma.classCourseRelation.findMany({
    where: { class_code },
  });

  if (relatedCourses.length > 0) {
    for (const relatedCourse of relatedCourses) {
      await prisma.classCourseRelation.delete({
        where: { id: relatedCourse.id },
      });
    }
  }
};

const updateClass = async (id: string,{ class_code, course_id }: updateClassBodyType) => {
  const existingClass = getClassById(id);

  if (!existingClass) throw new CustomError("class not found", 404);

  unassignClassfromCourse(class_code).catch((err) => {
    throw new CustomError(err.message, 500);
  });

  const updatedClass = await prisma.class.update({
    where: {
      class_code: id,
    },
    data: {
      class_code: class_code,
      course: {
        create: {
          course: {
            connect: { course_id },
          },
        },
      },
    },
  }).catch((err) => {
    throw new CustomError(err.message, 500);
  });;

  return updatedClass
};

export default {
  createClass,
  getAllClasses,
  getClassById,
  deleteClass,
  updateClass,
};
