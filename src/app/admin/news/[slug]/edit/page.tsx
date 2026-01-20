'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function EditArticlePage() {
  const params = useParams();
  const { slug } = params;

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
                <Link href="/admin/news">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Chỉnh Sửa Bài Viết</h1>
                <p className="text-muted-foreground">Chức năng chỉnh sửa bài viết đã bị vô hiệu hóa.</p>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Chức Năng Bị Vô Hiệu Hóa</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Đây là phiên bản chỉ dành cho giao diện người dùng. Không thể chỉnh sửa bài viết vì không có backend được kết nối.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
