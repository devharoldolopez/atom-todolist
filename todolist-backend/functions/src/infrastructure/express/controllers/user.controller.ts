import { NextFunction, Request, Response } from 'express';

import * as logger from "firebase-functions/logger";
import { User } from '../../../domain/users/user.entity';
import { UsersUseCase } from '../../../application/users/usecases/users.usecase';

export class UserController {
  constructor(private readonly usersUseCase: UsersUseCase) {}

  async getUsers(_req: Request, res: Response) {
    logger.info('Entro controller getUsers');
    try {
      const users = await this.usersUseCase.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    logger.info('Entro controller getUsers');
    
    const userEmail = req.params.email;

    try {
      const user = await this.usersUseCase.getUserByEmail(userEmail);
      if(!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
      }else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }

  async insertUser(req: Request, res: Response, next: NextFunction) {
    try{
      logger.info('Entro controller insertUser');
      const userParam = new User(req.body.name, req.body.email);
      const user = await this.usersUseCase.insertUser(userParam);
      res.status(201).json({ message: 'Usuario creado exitosamente', user });
    }catch(error){
      logger.info("Entro al catch de insertUser controller: ", error)
      next(error)
    }
  }
}
