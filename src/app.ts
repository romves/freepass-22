import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import router from './module/users/user-route';
import bodyParser from 'body-parser';


//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/s', router)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});