'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import withAuth from "@/components/auth/withAuth";

function AdminMediaPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Quản Lý Thư Viện</h1>
      <Card>
        <CardHeader>
          <CardTitle>Thư Viện Hình Ảnh & Video</CardTitle>
          <CardDescription>Tải lên và quản lý các album ảnh và video.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Chức năng quản lý thư viện sẽ được triển khai tại đây.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(AdminMediaPage, ['admin', 'editor']);
