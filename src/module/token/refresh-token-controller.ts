import { CustomError } from "../../error/custom-error";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { RequestHandler } from "express";
import prisma from "../../config/prisma";

const handleRefreshToken: RequestHandler = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken: string = cookies.jwt;

  const foundUser = await prisma.user.findFirst({
    where: { refresh_token: refreshToken },
  });
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.JWT_SECRET!,
    (err: any, decoded: any) => {
      if (err || foundUser.nim !== decoded.sub) return res.sendStatus(403);

      const accessToken = jwt.sign(
        {
          sub: decoded.sub,
        },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
      );
      res.json({ token: accessToken });
    }
  );
};

export { handleRefreshToken };
