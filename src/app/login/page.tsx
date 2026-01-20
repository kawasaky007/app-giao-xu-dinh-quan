import Footer from '@/components/footer';
import Header from '@/components/header';
import LoginForm from './login-form';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="container px-4 max-w-md">
          <div className="text-center mb-8">
            <LogIn className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
              Đăng Nhập
            </h1>
            <p className="text-muted-foreground mt-2">
              Truy cập vào khu vực quản trị của bạn.
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
