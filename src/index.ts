import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import express, { Express, Request, Response, NextFunction } from "express";

import userRoutes from '@/Router/user';
import authenticationrRoutes from '@/Router/authentication';
import jwtStrategy from "@/config/passport";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(passport.initialize({}));
passport.use('jwt', jwtStrategy);
app.use(express.json());
app.use(bodyParser.json())

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use('/v1', userRoutes);
app.use('/v1/auth', authenticationrRoutes);

app.use((err: { status?: number; message: string}, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
