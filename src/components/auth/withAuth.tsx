'use client';

import { useUser } from '@/firebase';
import { useUserRole } from '@/hooks/use-user-role';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Role = 'admin' | 'editor' | 'author';

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: Role[]
) => {
  const AuthComponent = (props: P) => {
    const { user, isUserLoading } = useUser();
    const { role, isLoading: isRoleLoading } = useUserRole(user);
    const router = useRouter();

    useEffect(() => {
      // If auth is done loading and there's no user, redirect to login
      if (!isUserLoading && !user) {
        router.replace('/login');
      }
    }, [isUserLoading, user, router]);

    const isLoading = isUserLoading || (user && isRoleLoading);

    // Show a global loading spinner while checking auth and role
    if (isLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    // If user is not authenticated, useEffect will handle redirection. Render nothing.
    if (!user) {
      return null;
    }

    // If user has a role and it's in the allowed list, show the component
    if (role && allowedRoles.includes(role as Role)) {
      return <WrappedComponent {...props} />;
    }
    
    // If role check is done but user is not authorized, show access denied
    if (!isRoleLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-background text-center">
          <div>
            <h1 className="text-3xl font-bold text-destructive">Truy Cập Bị Từ Chối</h1>
            <p className="mt-2 text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
            <Button onClick={() => router.push('/')} className="mt-4">
              Về Trang Chủ
            </Button>
          </div>
        </div>
      );
    }

    // Fallback loading state while role is being determined
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
  };

  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
