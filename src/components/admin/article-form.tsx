'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import type { NewsArticle } from '@/lib/news';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useStorage } from '@/firebase';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';
import { UploadCloud } from 'lucide-react';

const RichTextEditor = dynamic(() => import('./rich-text-editor'), { ssr: false });

const formSchema = z.object({
  title: z.string().min(3, { message: 'Tiêu đề phải có ít nhất 3 ký tự.' }),
  slug: z.string().min(3, { message: 'Slug phải có ít nhất 3 ký tự.' }).regex(/^[a-z0-9-]+$/, { message: 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang.' }),
  author: z.string().min(2, { message: 'Tác giả phải có ít nhất 2 ký tự.' }),
  category: z.enum(['Sự Kiện Giáo Xứ', 'Phục Vụ Cộng Đoàn', 'Phụng Vụ', 'Giáo Dục']),
  excerpt: z.string().min(10, { message: 'Tóm tắt phải có ít nhất 10 ký tự.' }).max(200, { message: 'Tóm tắt không được quá 200 ký tự.'}),
  content: z.string().min(50, { message: 'Nội dung phải có ít nhất 50 ký tự.' }),
  status: z.enum(['published', 'draft']),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Ngày không hợp lệ"}),
  thumbnail: z.string().optional(),
});

type ArticleFormValues = z.infer<typeof formSchema>;

interface ArticleFormProps {
    onSubmit: (data: any) => Promise<void>;
    initialData?: NewsArticle | null;
}

const createSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/đ/g, "d")
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
}

export default function ArticleForm({ onSubmit, initialData }: ArticleFormProps) {
    const storage = useStorage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const form = useForm<ArticleFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            author: initialData?.author || 'Ban Truyền Thông',
            category: initialData?.category || 'Sự Kiện Giáo Xứ',
            excerpt: initialData?.excerpt || '',
            content: initialData?.content || '',
            status: initialData?.status || 'draft',
            date: initialData?.date ? new Date(initialData.date).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
            thumbnail: initialData?.thumbnail || '',
        },
    });

    const thumbnailUrl = form.watch('thumbnail');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!storage) {
            toast({
                variant: "destructive",
                title: "Lỗi cấu hình",
                description: "Dịch vụ lưu trữ Firebase không khả dụng. Vui lòng thử lại sau hoặc liên hệ quản trị viên.",
            });
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        const sRef = storageRef(storage, `article-thumbnails/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(sRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                setIsUploading(false);
                let description = `Đã có lỗi xảy ra: ${error.message}`;
                 switch (error.code) {
                    case 'storage/unauthorized':
                        description = 'Bạn không có quyền tải tệp lên. Hãy chắc chắn rằng bạn đã đăng nhập và có quyền phù hợp.';
                        break;
                    case 'storage/canceled':
                        description = 'Quá trình tải lên đã bị hủy.';
                        break;
                    case 'storage/unknown':
                        description = 'Đã xảy ra lỗi không xác định. Vui lòng kiểm tra kết nối mạng của bạn.';
                        break;
                }
                toast({
                    variant: "destructive",
                    title: `Tải lên thất bại (${error.code})`,
                    description: description,
                });
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    form.setValue('thumbnail', downloadURL, { shouldDirty: true });
                    setIsUploading(false);
                }).catch((urlError) => {
                    setIsUploading(false);
                    toast({
                        variant: "destructive",
                        title: "Lỗi sau khi tải lên",
                        description: `Không thể lấy URL của tệp đã tải lên: ${urlError.message}`,
                    });
                });
            }
        );
    };
    
    const handleRemoveImage = () => {
        form.setValue('thumbnail', '', { shouldDirty: true });
    }


    const handleFormSubmit = async (values: ArticleFormValues) => {
        setIsSubmitting(true);
        await onSubmit(values);
        setIsSubmitting(false);
    };
    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValue('title', e.target.value);
        if (!form.formState.dirtyFields.slug) {
            form.setValue('slug', createSlug(e.target.value));
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                <Card>
                    <CardContent className="pt-6 grid gap-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tiêu đề</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tiêu đề bài viết..." {...field} onChange={handleTitleChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug (URL)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="tieu-de-bai-viet" {...field} />
                                    </FormControl>
                                    <FormDescription>Đây là phần URL của bài viết.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tóm tắt</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Một đoạn tóm tắt ngắn gọn cho bài viết..." {...field} />
                                    </FormControl>
                                     <FormDescription>Đoạn tóm tắt này sẽ xuất hiện trong danh sách tin tức.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nội dung</FormLabel>
                                    <FormControl>
                                        <RichTextEditor
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Viết nội dung bài viết tại đây..."
                                        />
                                    </FormControl>
                                    <FormDescription>Nội dung đầy đủ của bài viết. Hỗ trợ định dạng văn bản, liên kết và đa phương tiện.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ảnh bìa</FormLabel>
                                    <FormControl>
                                        <div className="w-full">
                                            {thumbnailUrl && !isUploading ? (
                                                <div className="relative w-full max-w-sm">
                                                    <div className="aspect-video rounded-md overflow-hidden border">
                                                        <Image src={thumbnailUrl} alt="Xem trước ảnh bìa" fill style={{ objectFit: 'cover' }} />
                                                    </div>
                                                    <Button variant="destructive" size="sm" onClick={handleRemoveImage} className="mt-2" disabled={isUploading}>
                                                        Xóa ảnh
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div 
                                                    className="relative flex justify-center items-center w-full max-w-sm h-64 rounded-lg border-2 border-dashed border-muted-foreground/40 hover:border-primary transition-colors cursor-pointer bg-secondary/40"
                                                    onClick={() => !isUploading && document.getElementById('thumbnail-upload')?.click()}
                                                >
                                                    <Input id="thumbnail-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={isUploading} />
                                                    {isUploading ? (
                                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                                            <Progress value={uploadProgress} className="w-3/4 mb-4" />
                                                            <p className="text-sm text-muted-foreground">{`Đang tải lên: ${Math.round(uploadProgress)}%`}</p>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center p-4">
                                                            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground/60" />
                                                            <p className="mt-2 font-semibold text-foreground">Kéo thả hoặc nhấn để tải ảnh lên</p>
                                                            <p className="mt-1 text-xs text-muted-foreground/80">PNG, JPG, GIF (tối đa 50MB)</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormDescription>Chọn một ảnh để làm ảnh bìa cho bài viết.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                         <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tác giả</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ngày đăng</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                         </div>
                         <div className="grid md:grid-cols-2 gap-6">
                             <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chuyên mục</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Chọn một chuyên mục" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Sự Kiện Giáo Xứ">Sự Kiện Giáo Xứ</SelectItem>
                                        <SelectItem value="Phục Vụ Cộng Đoàn">Phục Vụ Cộng Đoàn</SelectItem>
                                        <SelectItem value="Phụng Vụ">Phụng Vụ</SelectItem>
                                        <SelectItem value="Giáo Dục">Giáo Dục</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Trạng thái</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Chọn trạng thái" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="draft">Bản nháp</SelectItem>
                                        <SelectItem value="published">Đã xuất bản</SelectItem>
                                    </SelectContent>
                                    </Select>
                                     <FormDescription>Bản nháp sẽ không hiển thị công khai.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>Hủy</Button>
                    <Button type="submit" disabled={isSubmitting || isUploading}>
                        {isSubmitting ? 'Đang lưu...' : 'Lưu Bài Viết'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
