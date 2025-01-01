import {Router} from "express";
import {UserController} from "../controllers/user.controller";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {UserDTO} from "../../../dto/users/user.dto";

export default function userRoute(userController: UserController): Router {
  const router = Router();

  router.get(
    "/",
    (req, res, next) => userController.getUsers(req, res, next)
  );
  router.get(
    "/:email",
    (req, res, next) => userController.getUserByEmail(req, res, next)
  );
  router.post(
    "/",
    validationMiddleware(UserDTO),
    (req, res, next) => userController.insertUser(req, res, next)
  );
  router.put(
    "/:userId",
    (req, res, next) => userController.updateUser(req, res, next)
  );
  router.delete(
    "/:userId",
    (req, res, next) => userController.deleteUser(req, res, next)
  );

  return router;
}
