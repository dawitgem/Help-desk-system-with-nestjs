import { auth } from "@/firebase/firebaseconfig";
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithPopup,
} from "firebase/auth";
import dotenv from "dotenv";

const provider = new GoogleAuthProvider();
dotenv.config();  

export const GoogleAuthWithFirebase = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
    const credentials = GoogleAuthProvider.credentialFromResult(result);
    const token = credentials?.accessToken;
    const { displayName, phoneNumber, photoURL, email } = result.user;
    return { displayName, phoneNumber, photoURL, email };
    } catch (e:any) {
        throw new Error ("something went wrong!!!"+e)
        
    }
    
  };