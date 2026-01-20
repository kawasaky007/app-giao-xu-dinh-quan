import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from 'lucide-react';

function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Quản Lý Người Dùng</h1>
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
  );
}

export default AdminUsersPage;
