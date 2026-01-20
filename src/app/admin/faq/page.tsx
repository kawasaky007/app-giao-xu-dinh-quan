import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function AdminFaqPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Quản Lý Hỏi Đáp</h1>
      <Card>
        <CardHeader>
          <CardTitle>Các Câu Hỏi Thường Gặp</CardTitle>
          <CardDescription>Tạo, chỉnh sửa và xóa các câu hỏi và câu trả lời.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Chức năng quản lý Hỏi Đáp sẽ được triển khai tại đây.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminFaqPage;
