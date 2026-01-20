'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ArticleForm from '@/components/admin/article-form';
import { getAdminArticleBySlug, updateArticle, NewsArticle } from '@/lib/news';
import { useToast } from '@/hooks/use-toast';

export default function EditArticlePage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [article, setArticle] = useState<NewsArticle | null>(null);
    const [loading, setLoading] = useState(true);

    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    useEffect(() => {
        if (slug) {
            getAdminArticleBySlug(slug)
                .then((data) => {
                    if (data) {
                        setArticle(data);
                    } else {
                        toast({ variant: 'destructive', title: 'Lỗi', description: 'Không tìm thấy bài viết.' });
                        router.push('/admin/news');
                    }
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [slug, router, toast]);

    const handleSubmit = async (data: Partial<NewsArticle>) => {
        if (!article?.id) return;

        try {
            await updateArticle(article.id, data);
            toast({
                title: 'Cập nhật thành công!',
                description: `Bài viết "${data.title}" đã được cập nhật.`,
            });
            router.push('/admin/news');
            router.refresh();
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Ôi, đã có lỗi xảy ra!',
                description: 'Không thể cập nhật bài viết. Vui lòng thử lại.',
            });
        }
    };

    if (loading) {
        return <div>Đang tải trình soạn thảo...</div>;
    }

    if (!article) {
        return <div>Không tìm thấy bài viết.</div>;
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Chỉnh sửa bài viết</h1>
                <p className="text-muted-foreground">Cập nhật chi tiết bài viết bên dưới.</p>
            </div>
            <ArticleForm
                onSubmit={handleSubmit}
                initialData={article}
            />
        </div>
    );
}
