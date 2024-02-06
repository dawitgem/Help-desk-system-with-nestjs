import  { credential, initializeApp} from "firebase-admin";

import  serviceAccount from "./helpdesk-e3015-firebase-adminsdk-ns1jb-762b94cb05.json";
import { getAuth } from "firebase-admin/auth";

const app =initializeApp({
  credential: credential.cert("firebase-adminsdk-ns1jb@helpdesk-e3015.iam.gserviceaccount.com")
});

export const adminAuth=getAuth