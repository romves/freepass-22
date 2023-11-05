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
  const classes = await prisma.$queryRaw`

      select c1.class_code, c2.course_id, c2.name from class c1 
      join (
        select c3.name, c4.class_code, c4.course_id from course c3 
        join class_course c4 
        on c3.course_id=c4.course_id
      ) as c2 
      on c1.class_code=c2.class_code
      
    `.catch((err) => {
    throw new CustomError(err.message, 500);
  });

  if (!classes) throw new CustomError("user not found", 403);

  return classes;
};

const getClassById = async (class_code: string) => {
  const class_1 = await prisma.$queryRaw<ClassData[]>`

  select c1.class_code, c2.course_id, c2.name from class c1 
  join (
    select c3.name, c4.class_code, c4.course_id from course c3 
    join class_course c4 
    on c3.course_id=c4.course_id
  ) as c2 
  on c1.class_code=c2.class_code
  where c1.class_code = ${class_code}
  limit 1

`.catch((err) => {
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

