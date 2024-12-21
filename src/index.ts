import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import express, { Express } from "express";

import userRoutes from '@/router/user';
import jwtStrategy from "@/config/passport";
import permissionRoutes from '@/router/permission';
import rolePermissionRoutes from '@/router/rolePermission';
import authenticationRoutes from '@/router/authentication';

import { Database } from "./database";

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

app.use('/v1/users', userRoutes);
app.use('/v1/auth', authenticationRoutes);
app.use('/v1/permission', permissionRoutes);
app.use('/v1/role-permission', rolePermissionRoutes);

Database.initialize();


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
