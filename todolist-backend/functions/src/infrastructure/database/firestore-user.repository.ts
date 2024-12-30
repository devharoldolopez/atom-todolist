import { User } from '../../domain/users/user.entity';
import * as logger from "firebase-functions/logger";
import { FirebaseConfig } from '../config/firebase.config';
import { UserRepository } from '../../application/users/interfaces/user-repository.interface';
import { ValidatorService } from '../services/validator.service';
import { ErrorService } from '../services/error.service';


export class FirestoreUserRepository implements UserRepository {

  private readonly collection = FirebaseConfig.getFirestore().collection('users');
  private readonly validatorService = new ValidatorService(this.collection);

  async getAllUsers(): Promise<User[]> {
    logger.info('Entro a getAllUsers');
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => this.toDomain(doc));
  }

  async getUserByEmail(email:string): Promise<User|undefined> {

    logger.info('Entro a getUserByEmail');

    const snapshot = await this.collection.where('email', '==', email).limit(1).get();
    logger.info('snapshot::', snapshot.docs);

    if (snapshot.empty)
      return undefined;

    return this.toDomain(snapshot.docs[0]);
  }

  async insertUser(user: User): Promise<User> {
    logger.info('Entro a insertUsers');

    const isValidEmail = await this.validatorService.isValidToInsert('email', user.email, false);
    if(!isValidEmail)
      ErrorService.throwEmailExistsError('El email ya está registrado');

    const docRef = await this.collection.add({
      name: user.name,
      email: user.email
    });

    return this.toDomain(await docRef.get());
  }

  async updateUser(user: User): Promise<User|undefined> {
    logger.info('Entro a insertUsers');

    if (!user.id) {
      throw new Error('El campo id del usuario es requerido para actualizar');
    }

    const docRef = this.collection.doc(user.id);
    const doc = await docRef.get();

    if(!doc.exists)
      return undefined;

    await docRef.update({
      name: user.name,
      email: user.email
    });

    return this.toDomain(await docRef.get());
  }

  async deleteUser(id:string): Promise<void> {
    logger.info('Entro a deleteUsers');
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();
    if(!doc.exists)
      throw new Error(`Usuario con ID ${id}`)

    await docRef.delete();
  }

  private toDomain(doc: FirebaseFirestore.DocumentSnapshot): User {
    const data = doc.data();
    if (!data) throw new Error('Document data no está definido');
    return new User(data.name, data.email, doc.id);
  }
}