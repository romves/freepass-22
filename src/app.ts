import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import userRoute from "./module/users/user-route";
import refreshRoute from "./module/token/refresh-token-route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import classRoute from "./module/classes/class-route";
import { verifyJWT } from "./middleware/verifyJWT";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use("/refresh", refreshRoute);
app.use("/user", userRoute);

app.use(verifyJWT);
app.use("/admin", classRoute);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
