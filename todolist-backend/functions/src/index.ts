import {onRequest} from "firebase-functions/v2/https";
import express from 'express';
import userRoute from './infrastructure/express/routes/user.route';
import { Assemblers } from "./config/dependency-injection";
import { errorHandlerMiddleware } from './infrastructure/express/middlewares/error-handler.middleware';
import tasksRoute from "./infrastructure/express/routes/tasks.route";
import authRoute from "./infrastructure/express/routes/auth.route";

const app = express();
app.use(express.json());

const userController = Assemblers.userController();
const taskController = Assemblers.tasksController();
const authController = Assemblers.authController();

app.use('/users', userRoute(userController));
app.use('/tasks', tasksRoute(taskController));
app.use('/auth', authRoute(authController));

app.use(errorHandlerMiddleware);

export const api = onRequest(app);