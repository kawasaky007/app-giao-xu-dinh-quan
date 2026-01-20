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
import { Event } from '@/lib/events';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';

const RichTextEditor = useMemo(() => dynamic(() => import('@/components/admin/rich-text-editor'), {
    ssr: false,
    loading: () => <p>Đang tải trình soạn thảo...</p>
}), []);


const formSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống.'),
  slug: z.string().min(1, 'Slug không được để trống.'),
  date: z.date({
    required_error: "Ngày diễn ra là bắt buộc.",
  }),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Phải là định dạng HH:mm"),
  location: z.string().min(1, 'Địa điểm không được để trống.'),
  category: z.enum(['Sự Kiện Giáo Xứ', 'Gây Quỹ', 'Tăng Tiến Đời Sống Thiêng Liêng', 'Phục Vụ Cộng Đoàn']),
  excerpt: z.string().min(10, 'Tóm tắt phải có ít nhất 10 ký tự.'),
  description: z.string().min(20, 'Nội dung phải có ít nhất 20 ký tự.'),
  image: z.string().url({message: "Phải là một URL hợp lệ."}).optional().or(z.literal('')),
});

type EventFormProps = {
  event?: Event;
};

export default function EventForm({ event }: EventFormProps) {
    
  const defaultValues = useMemo(() => {
    if (event) {
        const startDate = new Date(event.date);
        const endDate = new Date(event.endTime);
        return {
            ...event,
            date: startDate,
            endTime: format(endDate, 'HH:mm'),
        }
    }
    return {
      title: '',
      slug: '',
      date: new Date(),
      endTime: '19:00',
      location: 'Nhà Thờ Giáo Xứ',
      category: 'Sự Kiện Giáo Xứ' as const,
      excerpt: '',
      description: '',
      image: '',
    }
  }, [event]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { date, endTime, ...rest } = values;
    const [hours, minutes] = endTime.split(':');
    const endDate = new Date(date);
    endDate.setHours(parseInt(hours), parseInt(minutes));

    const finalValues = {
        ...rest,
        date: date.toISOString(),
        endTime: endDate.toISOString(),
    };
    
    // This is a mock function, it doesn't do anything.
    console.log(finalValues);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Chi Tiết Sự Kiện</CardTitle>
                <CardDescription>Điền thông tin chính cho sự kiện của bạn.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề</FormLabel>
                      <FormControl>
                        <Input placeholder="Tên sự kiện" {...field} />
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
                          placeholder="Một đoạn tóm tắt ngắn gọn về sự kiện"
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Mô tả chi tiết</FormLabel>
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
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Ngày bắt đầu</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Chọn ngày</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date("1900-01-01")}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Thời gian kết thúc (HH:mm)</FormLabel>
                            <FormControl>
                                <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Địa điểm</FormLabel>
                        <FormControl>
                            <Input placeholder="Địa điểm diễn ra sự kiện" {...field} />
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
                                <SelectValue placeholder="Chọn chuyên mục" />
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
                     <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Slug (URL)</FormLabel>
                        <FormControl>
                            <Input placeholder="vi-du-slug-su-kien" {...field} />
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
                        name="image"
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
            <Button type="button" variant="outline" asChild><Link href="/admin/events">Hủy</Link></Button>
            <Button type="submit" disabled>Lưu Sự Kiện</Button>
        </div>
      </form>
    </Form>
  );
}
