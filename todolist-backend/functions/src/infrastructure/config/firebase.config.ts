import admin from "firebase-admin";

export class FirebaseConfig {
  private static initialized = false;

  static init(): void {
    if (this.initialized) return;

    admin.initializeApp();
    this.initialized = true;
  }

  static getFirestore(): FirebaseFirestore.Firestore {
    this.init();
    return admin.firestore();
  }
}
