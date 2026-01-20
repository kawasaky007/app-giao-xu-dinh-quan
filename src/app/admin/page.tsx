'use client';

import withAuth from '@/components/auth/withAuth';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/50 font-body">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 max-w-4xl">
            <div className='mb-8'>
                <Button asChild variant="outline">
                    <Link href="/dashboard">← Quay lại Trang quản trị</Link>
                </Button>
            </div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8">
            Trang Quản Trị Viên
          </h1>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users /> Quản Lý Người Dùng
              </CardTitle>
              <CardDescription>
                Khu vực này dành cho quản lý người dùng và vai trò. Chức năng này đang được phát triển.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tại đây, quản trị viên có thể xem danh sách tất cả người dùng, chỉnh sửa vai trò của họ (admin, editor, author) và xóa người dùng nếu cần.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Protect this page, allowing access only for users with the 'admin' role.
export default withAuth(AdminPage, ['admin']);
