import * as logger from "firebase-functions/logger";

export class ValidatorService {
  constructor(private readonly collection: FirebaseFirestore.CollectionReference) {}

  async isValidToInsert(field:string, value:string, isUpdate:boolean): Promise<boolean> {
  
    logger.info('Entro a isValidToInsert');

    const snapshot = await this.collection.where(field, '==', value).get();
    logger.info('snapshot::', snapshot.docs);
    const docs = snapshot.docs

    return isUpdate ? docs.length <= 1 : snapshot.empty;
  }

}