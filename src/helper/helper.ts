import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";
import z from 'zod'

export const validation =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse
      console.log(req.body)
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e: any) {
      // Error
      if (e instanceof z.ZodError) {
        // Handle Zod error
        const validationErrors = e.errors.map((error) => ({
          path: error.path.join("."),
          message: error.message,
        }));

        return res.status(400).json({ errors: validationErrors });
      } else {
        // Handle other unexpected errors
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
