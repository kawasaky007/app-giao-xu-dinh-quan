'use client';
import { doc, setDoc, Firestore } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
};

export type UserRole = 'admin' | 'editor' | 'author';

export async function createUserProfile(firestore: Firestore, uid: string, data: Omit<UserProfile, 'uid'>) {
    const userProfileRef = doc(firestore, 'users', uid);
    const profileData = { ...data, uid };
    
    await setDoc(userProfileRef, profileData)
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: userProfileRef.path,
                operation: 'create',
                requestResourceData: profileData,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw err;
        });
}

export async function assignUserRole(firestore: Firestore, uid: string, role: UserRole) {
    const roleRef = doc(firestore, 'roles', uid);
    const roleData = { role };

    await setDoc(roleRef, roleData)
        .catch(err => {
            const permissionError = new FirestorePermissionError({
                path: roleRef.path,
                operation: 'create',
                requestResourceData: roleData,
            });
            errorEmitter.emit('permission-error', permissionError);
            throw err;
        });
}
