import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  nim?: any;
}

export const verifyJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.nim = decoded?.sub;

    next();
  });
};
