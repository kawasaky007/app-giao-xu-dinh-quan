'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import withAuth from "@/components/auth/withAuth";

function AdminEventsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Quản Lý Sự Kiện</h1>
      <Card>
        <CardHeader>
          <CardTitle>Sự Kiện</CardTitle>
          <CardDescription>Tạo, chỉnh sửa và xóa các sự kiện của giáo xứ.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Chức năng quản lý sự kiện sẽ được triển khai tại đây.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(AdminEventsPage, ['admin', 'editor']);
