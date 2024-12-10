import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import userRoutes from '@/Router/user'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use('/api', userRoutes);

