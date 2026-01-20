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
import type { Event } from '@/lib/events';
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
  excerpt: z.string().min(10, { message: 'Tóm tắt phải có ít nhất 10 ký tự.' }).max(200, { message: 'Tóm tắt không được quá 200 ký tự.'}),
  description: z.string().min(50, { message: 'Nội dung phải có ít nhất 50 ký tự.' }),
  image: z.string().optional(),
  location: z.string().min(3, { message: "Địa điểm phải có ít nhất 3 ký tự."}),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Ngày bắt đầu không hợp lệ"}),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Ngày kết thúc không hợp lệ"}),
  category: z.enum(['Sự Kiện Giáo Xứ', 'Gây Quỹ', 'Tăng Tiến Đời Sống Thiêng Liêng', 'Phục Vụ Cộng Đoàn']),
});

type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
    onSubmit: (data: any) => Promise<void>;
    initialData?: Event | null;
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

const toDatetimeLocal = (isoString: string) => {
    const date = new Date(isoString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
};

export default function EventForm({ onSubmit, initialData }: EventFormProps) {
    const storage = useStorage();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const form = useForm<EventFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            excerpt: initialData?.excerpt || '',
            description: initialData?.description || '',
            image: initialData?.image || '',
            location: initialData?.location || '',
            date: initialData?.date ? toDatetimeLocal(initialData.date) : '',
            endTime: initialData?.endTime ? toDatetimeLocal(initialData.endTime) : '',
            category: initialData?.category || 'Sự Kiện Giáo Xứ',
        },
    });

    const imageUrl = form.watch('image');

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

        const sRef = storageRef(storage, `event-images/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(sRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload failed:", error);
                setIsUploading(false);
                toast({
                    variant: "destructive",
                    title: "Tải lên thất bại",
                    description: `Đã có lỗi xảy ra: ${error.message}`,
                });
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    form.setValue('image', downloadURL, { shouldDirty: true });
                    setIsUploading(false);
                });
            }
        );
    };

    const handleRemoveImage = () => {
        form.setValue('image', '', { shouldDirty: true });
    }

    const handleFormSubmit = async (values: EventFormValues) => {
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
                                    <FormLabel>Tiêu đề sự kiện</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ví dụ: Hội chợ Giáng Sinh" {...field} onChange={handleTitleChange} />
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
                                        <Input placeholder="vi-du-hoi-cho-giang-sinh" {...field} />
                                    </FormControl>
                                    <FormDescription>Đây là phần URL của sự kiện.</FormDescription>
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
                                        <Textarea placeholder="Một đoạn tóm tắt ngắn gọn về sự kiện..." {...field} />
                                    </FormControl>
                                     <FormDescription>Đoạn tóm tắt này sẽ xuất hiện trong danh sách sự kiện.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mô tả chi tiết</FormLabel>
                                    <FormControl>
                                        <RichTextEditor
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Viết nội dung mô tả chi tiết sự kiện tại đây..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ảnh bìa sự kiện</FormLabel>
                                    <FormControl>
                                        <div className="w-full">
                                            {imageUrl && !isUploading ? (
                                                <div className="relative w-full max-w-sm">
                                                    <div className="aspect-video rounded-md overflow-hidden border">
                                                        <Image src={imageUrl} alt="Xem trước ảnh bìa" fill style={{ objectFit: 'cover' }} />
                                                    </div>
                                                    <Button variant="destructive" size="sm" onClick={handleRemoveImage} className="mt-2" disabled={isUploading}>
                                                        Xóa ảnh
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div 
                                                    className="relative flex justify-center items-center w-full max-w-sm h-64 rounded-lg border-2 border-dashed border-muted-foreground/40 hover:border-primary transition-colors cursor-pointer bg-secondary/40"
                                                    onClick={() => !isUploading && document.getElementById('event-image-upload')?.click()}
                                                >
                                                    <Input id="event-image-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={isUploading} />
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
                                    <FormDescription>Chọn một ảnh để làm ảnh bìa cho sự kiện.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                         <div className="grid md:grid-cols-2 gap-6">
                             <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Địa điểm</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ví dụ: Hội trường giáo xứ" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                        <SelectItem value="Gây Quỹ">Gây Quỹ</SelectItem>
                                        <SelectItem value="Tăng Tiến Đời Sống Thiêng Liêng">Tăng Tiến Đời Sống Thiêng Liêng</SelectItem>
                                        <SelectItem value="Phục Vụ Cộng Đoàn">Phục Vụ Cộng Đoàn</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                         </div>
                         <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thời gian bắt đầu</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thời gian kết thúc</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
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
                        {isSubmitting ? 'Đang lưu...' : 'Lưu Sự Kiện'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
