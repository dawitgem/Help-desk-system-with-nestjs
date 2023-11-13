import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { rejects } from 'assert';
import { url } from 'inspector';
dotenv.config();
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export { uploadBytesResumable };
export const auth = getAuth(app);

@Injectable()
export class FirebaseService {
  constructor() {}

  async uploadAttachments(files: any[]) {
    const urls = await Promise.all(
      files.map(async (file) => {
        return new Promise((resolve, reject) => {
          const emailAttachmentRef = ref(
            storage,
            `attachment/${file.filename}`,
          );
          const content = Buffer.from(file.content);
          const fileblob = new Uint8Array(content);
          const uploadTask = uploadBytesResumable(
            emailAttachmentRef,
            fileblob,
            {
              contentType: file.contentType,
            },
          );
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                Math.round(
                  ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / 5,
                ) * 5;
              console.log(progress);
            },
            (Error) => {
              switch (Error.code) {
                case 'storage/unauthorized':
                  break;
                case 'storage/canceled':
                  break;
                case 'storage/unknown':
                  break;
              }
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
                return url;
              } catch (e: any) {
                reject(e.message);
              }
            },
          );
        });
      }),
    );
    return urls;
  }
}
