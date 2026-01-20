'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { NewsArticle } from '@/lib/news';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function AdminNewsPage() {
    const firestore = useFirestore();
    
    const articlesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'news'), orderBy('date', 'desc'));
    }, [firestore]);

    const { data: articles, isLoading, error } = useCollection<NewsArticle>(articlesQuery);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Quản Lý Tin Tức</h1>
                    <p className="text-muted-foreground">Tạo, chỉnh sửa và quản lý các bài viết tin tức.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/news/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tạo Bài Viết Mới
                    </Link>
                </Button>
            </div>

            {isLoading && <p>Đang tải bài viết...</p>}
            {error && <p className="text-destructive">Lỗi khi tải bài viết: {error.message}</p>}
            {articles && <DataTable columns={columns} data={articles} />}
        </div>
    );
}
