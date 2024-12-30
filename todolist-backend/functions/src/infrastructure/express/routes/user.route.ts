import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { UserDTO } from '../../../dto/users/user.dto';

export default function userRoute(userController: UserController): Router {
  const router = Router();

  router.get('/all', (req,res) => userController.getUsers(req, res));
  router.get('/:email', (req,res) => userController.getUserByEmail(req, res));
  router.post('/', validationMiddleware(UserDTO),(req,res,next) => userController.insertUser(req, res, next));
  router.put('/:id', (req,res) => userController.getUsers(req, res));
  router.delete('/:id', (req,res) => userController.getUsers(req, res));

  return router;
}