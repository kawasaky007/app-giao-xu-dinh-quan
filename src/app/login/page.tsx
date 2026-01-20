import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogIn } from 'lucide-react';
import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                        <LogIn className="w-8 h-8" />
                    </div>
                    <CardTitle className="font-headline text-2xl">Đăng Nhập Quản Trị</CardTitle>
                    <CardDescription>Nhập thông tin đăng nhập của bạn để truy cập trang quản trị.</CardDescription>
                </CardHeader>
                <LoginForm />
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
