'use client';

import { useMemoFirebase, useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { useMemo } from 'react';

export function useUserRole(user: User | null) {
  const firestore = useFirestore();
  
  const roleRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    // The path to the user's role document
    return doc(firestore, 'roles', user.uid);
  }, [user, firestore]);

  // Use the useDoc hook to get real-time updates on the role document
  const { data: roleData, isLoading, error } = useDoc<{ role: string }>(roleRef);
  
  // Memoize the role value to prevent unnecessary re-renders
  const role = useMemo(() => roleData?.role ?? null, [roleData]);

  return {
    role,
    isLoading,
    error,
  };
}
