'use client';
import EventForm from '@/components/admin/event-form';
import { createEvent, Event } from '@/lib/events';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function NewEventPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (data: Omit<Event, 'id'>) => {
        try {
            await createEvent(data);
            toast({
                title: 'Tạo thành công!',
                description: `Sự kiện "${data.title}" đã được tạo.`,
            });
            router.push('/admin/events');
            router.refresh(); // Refresh server components
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Ôi, đã có lỗi xảy ra!',
                description: 'Không thể tạo sự kiện. Vui lòng thử lại.',
            });
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Tạo Sự Kiện Mới</h1>
                <p className="text-muted-foreground">Điền vào biểu mẫu dưới đây để tạo một sự kiện mới.</p>
            </div>
            <EventForm onSubmit={handleSubmit} />
        </div>
    );
}
