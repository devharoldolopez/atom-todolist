import {User} from "../../domain/users/user.entity";
import * as logger from "firebase-functions/logger";
import {FirebaseConfig} from "../config/firebase.config";
import {UserRepository} from "../../application/users/interfaces/user.interface";
import {ValidatorService} from "../services/validator.service";
import {ErrorService} from "../services/error.service";
import {CommonConstants} from "../../constants/general/app.constants";
import {UserErrorsConstants} from "../../constants/errors/user.constants";


export class FirestoreUserRepository implements UserRepository {
  private readonly collection = FirebaseConfig.getFirestore().collection(
    CommonConstants.USER_COLLECTION
  );
  private readonly validatorService = new ValidatorService(this.collection);

  async getAllUsers(): Promise<User[]> {
    logger.info("Entro a getAllUsers");
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => this.toDomain(doc));
  }

  async getUserByEmail(email:string): Promise<User> {
    logger.info("Entro a getUserByEmail");

    const snapshot = await this.collection.where(
      CommonConstants.EMAIL_FIELD, "==", email
    ).limit(1).get();
    logger.info("snapshot::", snapshot.docs);

    if (snapshot.empty) {
      ErrorService.throwNotFound(
        UserErrorsConstants.USER_NOT_FOUND_EMAIL.internalCode,
        UserErrorsConstants.USER_NOT_FOUND_EMAIL.msg
      );
    }

    return this.toDomain(snapshot.docs[0]);
  }

  async insertUser(user: User): Promise<User> {
    logger.info("Entro a insertUsers");

    const isValidEmail = await this.validatorService.isValidToInsert(
      CommonConstants.EMAIL_FIELD,
      user.email,
      false
    );

    if (!isValidEmail) {
      ErrorService.throwEmailExistsError(
        UserErrorsConstants.EMAIL_ALREADY_EXISTS.internalCode,
        UserErrorsConstants.EMAIL_ALREADY_EXISTS.msg
      );
    }

    const docRef = await this.collection.add({
      name: user.username,
      email: user.email,
    });

    return this.toDomain(await docRef.get());
  }

  async updateUser(user: User): Promise<User> {
    logger.info("Entro a insertUsers: ", user.id);

    if (!user.id) {
      ErrorService.throwValidationError(
        UserErrorsConstants.USER_ID_FIELD_REQUIRED.internalCode,
        UserErrorsConstants.USER_ID_FIELD_REQUIRED.msg
      );
    }

    const docRef = this.collection.doc(user.id as string);
    const doc = await docRef.get();

    if (!doc.exists) {
      ErrorService.throwNotFound(
        UserErrorsConstants.USER_UPDATED_NOT_EXISTS.internalCode,
        UserErrorsConstants.USER_UPDATED_NOT_EXISTS.msg
      );
    }

    await docRef.update({
      name: user.username,
      email: user.email,
    });

    return this.toDomain(await docRef.get());
  }

  async deleteUser(id:string): Promise<void> {
    logger.info("Entro a deleteUsers");
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      ErrorService.throwGeneralError(
        UserErrorsConstants.USER_DELETED_NOT_EXISTS.internalCode,
        UserErrorsConstants.USER_DELETED_NOT_EXISTS.msg
      );
    }

    await docRef.delete();
  }

  private toDomain(doc: FirebaseFirestore.DocumentSnapshot): User {
    const data = doc.data();
    if (!data) {
      ErrorService.throwGeneralError(
        UserErrorsConstants.DOCUMENT_NOT_DEFINED.internalCode,
        UserErrorsConstants.DOCUMENT_NOT_DEFINED.msg
      );
    }
    return new User(data.username, data.email, doc.id);
  }
}
