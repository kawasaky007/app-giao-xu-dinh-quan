import { LoginForm } from '@/components/login-form';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
            <Link href="/" className="flex items-center justify-center gap-3 mb-6 text-primary">
                <Shield className="w-8 h-8" />
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                    GiaoXu DinhQuan
                </h1>
            </Link>
            <LoginForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
                <Link href="/" className="underline underline-offset-4 hover:text-primary transition-colors">
                    Back to Home
                </Link>
            </p>
        </div>
    </div>
  );
}
