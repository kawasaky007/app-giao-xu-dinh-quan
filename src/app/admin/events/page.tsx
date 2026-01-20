'use client';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Event } from '@/lib/events';
import { columns } from './columns';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function AdminEventsPage() {
    const firestore = useFirestore();
    
    const eventsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'events'), orderBy('date', 'desc'));
    }, [firestore]);

    const { data: events, isLoading, error } = useCollection<Event>(eventsQuery);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Quản Lý Sự Kiện</h1>
                    <p className="text-muted-foreground">Tạo, chỉnh sửa và quản lý các sự kiện của giáo xứ.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/events/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tạo Sự Kiện Mới
                    </Link>
                </Button>
            </div>

            {isLoading && <p>Đang tải sự kiện...</p>}
            {error && <p className="text-destructive">Lỗi khi tải sự kiện: {error.message}</p>}
            {events && <DataTable columns={columns} data={events} filterColumnId="title" filterPlaceholder="Lọc theo tiêu đề..."/>}
        </div>
    );
}
