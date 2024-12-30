/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import express from 'express';
import userRoute from './infrastructure/express/routes/user.route';
import { Assemblers } from "./config/dependency-injection";
import { errorHandlerMiddleware } from './infrastructure/express/middlewares/error-handler.middleware';


const app = express();
app.use(express.json());

const userController = Assemblers.userController();

app.use('/users', userRoute(userController));

app.use(errorHandlerMiddleware);


export const api = onRequest(app);