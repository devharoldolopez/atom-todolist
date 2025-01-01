import {User} from "../../domain/users/user.entity";
import * as logger from "firebase-functions/logger";
import {FirebaseConfig} from "../config/firebase.config";
import {ErrorService} from "../services/error.service";
import {CommonConstants} from "../../constants/general/app.constants";
import {UserErrorsConstants} from "../../constants/errors/user.constants";
import {AuthRepository} from "../../application/auth/interfaces/auth.interface";


export class FirestoreAuthRepository implements AuthRepository {
  private readonly collection = FirebaseConfig.getFirestore().collection(
    CommonConstants.USER_COLLECTION
  );

  async verifyUserLogin(email: string): Promise<User> {
    logger.info("Entro a verifyUserLogin");
    const snapshot = await this.collection.where(
      CommonConstants.EMAIL_FIELD, "==", email
    ).limit(1).get();

    if (snapshot.empty) {
      ErrorService.throwNotFound(
        UserErrorsConstants.USER_NOT_FOUND_EMAIL.internalCode,
        UserErrorsConstants.USER_NOT_FOUND_EMAIL.msg
      );
    }

    return this.toDomain(snapshot.docs[0]);
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
