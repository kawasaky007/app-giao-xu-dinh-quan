'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EventForm from '@/components/admin/event-form';
import { getEventBySlug, updateEvent, Event } from '@/lib/events';
import { useToast } from '@/hooks/use-toast';

export default function EditEventPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    useEffect(() => {
        if (slug) {
            getEventBySlug(slug)
                .then((data) => {
                    if (data) {
                        setEvent(data);
                    } else {
                        toast({ variant: 'destructive', title: 'Lỗi', description: 'Không tìm thấy sự kiện.' });
                        router.push('/admin/events');
                    }
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [slug, router, toast]);

    const handleSubmit = async (data: Partial<Event>) => {
        if (!event?.id) return;

        try {
            await updateEvent(event.id, data);
            toast({
                title: 'Cập nhật thành công!',
                description: `Sự kiện "${data.title}" đã được cập nhật.`,
            });
            router.push('/admin/events');
            router.refresh();
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Ôi, đã có lỗi xảy ra!',
                description: 'Không thể cập nhật sự kiện. Vui lòng thử lại.',
            });
        }
    };

    if (loading) {
        return <div>Đang tải trình soạn thảo...</div>;
    }

    if (!event) {
        return <div>Không tìm thấy sự kiện.</div>;
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Chỉnh sửa sự kiện</h1>
                <p className="text-muted-foreground">Cập nhật chi tiết sự kiện bên dưới.</p>
            </div>
            <EventForm
                onSubmit={handleSubmit}
                initialData={event}
            />
        </div>
    );
}
