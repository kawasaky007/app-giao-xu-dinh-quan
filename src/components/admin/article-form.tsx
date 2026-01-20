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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NewsArticle } from '@/lib/news';
import dynamic from 'next/dynamic';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import Link from 'next/link';

const RichTextEditor = dynamic(() => import('@/components/admin/rich-text-editor'), {
    ssr: false,
    loading: () => <p>Đang tải trình soạn thảo...</p>
});


const formSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống.'),
  slug: z.string().min(1, 'Slug không được để trống.'),
  author: z.string().min(1, 'Tác giả không được để trống.'),
  category: z.enum(['Sự Kiện Giáo Xứ', 'Phục Vụ Cộng Đoàn', 'Phụng Vụ', 'Giáo Dục']),
  status: z.enum(['published', 'draft']),
  excerpt: z.string().min(10, 'Tóm tắt phải có ít nhất 10 ký tự.'),
  content: z.string().min(20, 'Nội dung phải có ít nhất 20 ký tự.'),
  thumbnail: z.string().url({message: "Phải là một URL hợp lệ."}).optional().or(z.literal('')),
});

type ArticleFormProps = {
  article?: NewsArticle;
};

export default function ArticleForm({ article }: ArticleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: article || {
      title: '',
      slug: '',
      author: 'Ban Truyền Thông',
      category: 'Sự Kiện Giáo Xứ',
      status: 'draft',
      excerpt: '',
      content: '',
      thumbnail: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This is a mock function, it doesn't do anything.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Chi Tiết Bài Viết</CardTitle>
                <CardDescription>Điền thông tin chính cho bài viết của bạn.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề</FormLabel>
                      <FormControl>
                        <Input placeholder="Tiêu đề bài viết" {...field} />
                      </FormControl>
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
                        <Textarea
                          placeholder="Một đoạn tóm tắt ngắn gọn về bài viết"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
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
                            <RichTextEditor {...field} />
                        </FormControl>
                         <FormDescription>
                            Chức năng tải ảnh trong trình soạn thảo hiện không hoạt động trong bản demo này.
                         </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle>Thuộc tính</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Slug (URL)</FormLabel>
                        <FormControl>
                            <Input placeholder="vi-du-slug-bai-viet" {...field} />
                        </FormControl>
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
                            <SelectItem value="published">Đã xuất bản</SelectItem>
                            <SelectItem value="draft">Bản nháp</SelectItem>
                            </SelectContent>
                        </Select>
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
                                <SelectValue placeholder="Chọn chuyên mục" />
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
                </CardContent>
             </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Ảnh bìa</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL Ảnh Bìa</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com/image.jpg" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Dán URL ảnh bìa ở đây. Chức năng tải lên hiện không hoạt động.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </Card>
          </div>
        </div>

        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Chế độ Demo Giao diện</AlertTitle>
          <AlertDescription>
            Đây là bản xem trước chỉ dành cho giao diện người dùng. Nút lưu đã bị vô hiệu hóa vì không có backend nào được kết nối.
          </AlertDescription>
        </Alert>

        <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" asChild><Link href="/admin/news">Hủy</Link></Button>
            <Button type="submit" disabled>Lưu Bài Viết</Button>
        </div>
      </form>
    </Form>
  );
}
