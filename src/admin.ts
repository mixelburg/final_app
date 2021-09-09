import admin from "firebase-admin";
import ServiceAccount from "./secret/ServiceAccount"

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount as any)
});

const db = admin.firestore();

export { db, admin }
