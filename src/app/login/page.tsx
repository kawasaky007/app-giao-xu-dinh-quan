import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

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
                    <CardTitle className="font-headline text-2xl">Đăng Nhập</CardTitle>
                    <CardDescription>Chức năng đăng nhập đã bị vô hiệu hóa.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground">
                        Đây là phiên bản chỉ dành cho giao diện người dùng. Không có backend hoặc chức năng xác thực nào được kết nối.
                    </p>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
