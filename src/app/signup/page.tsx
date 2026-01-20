import SignUpForm from './signup-form';
import { UserPlus } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <main className="flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="container px-4 max-w-md">
          <div className="text-center mb-8">
            <UserPlus className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
              Tạo Tài Khoản
            </h1>
            <p className="text-muted-foreground mt-2">
              Tạo một tài khoản quản trị để bắt đầu.
            </p>
          </div>
          <SignUpForm />
        </div>
      </main>
    </div>
  );
}
