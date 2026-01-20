import { getAllNewsArticles, NewsArticle } from '@/lib/news';
import { columns } from './columns';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default async function AdminNewsPage() {
    const articles = await getAllNewsArticles();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Quản Lý Tin Tức</h1>
                    <p className="text-muted-foreground">Tạo, chỉnh sửa và quản lý các bài viết tin tức.</p>
                </div>
                <Button disabled>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tạo Bài Viết Mới
                </Button>
            </div>
            
            {articles && <DataTable columns={columns} data={articles} filterColumnId="title" filterPlaceholder="Lọc theo tiêu đề..."/>}
        </div>
    );
}
