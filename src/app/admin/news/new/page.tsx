'use client';
import ArticleForm from '@/components/admin/article-form';
import { createArticle } from '@/lib/news';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { NewsArticle } from '@/lib/news';

export default function NewArticlePage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (data: Omit<NewsArticle, 'id'>) => {
        try {
            await createArticle(data);
            toast({
                title: 'Tạo thành công!',
                description: `Bài viết "${data.title}" đã được tạo.`,
            });
            router.push('/admin/news');
            router.refresh(); // Refresh server components
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Ôi, đã có lỗi xảy ra!',
                description: 'Không thể tạo bài viết. Vui lòng thử lại.',
            });
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Tạo Bài Viết Mới</h1>
                <p className="text-muted-foreground">Điền vào biểu mẫu dưới đây để tạo một bài viết tin tức mới.</p>
            </div>
            <ArticleForm onSubmit={handleSubmit} />
        </div>
    );
}
