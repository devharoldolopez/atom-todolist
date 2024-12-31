import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";


export default function authRoute(authController: AuthController): Router {
  const router = Router();

  router.post('/login', (req, res, next) => authController.login(req, res, next));

  return router;
}