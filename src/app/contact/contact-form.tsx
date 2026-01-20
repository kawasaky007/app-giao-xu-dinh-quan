'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Tên phải có ít nhất 2 ký tự.',
  }),
  email: z.string().email({
    message: 'Vui lòng nhập một địa chỉ email hợp lệ.',
  }),
  message: z.string().min(10, {
    message: 'Tin nhắn phải có ít nhất 10 ký tự.',
  }).max(500, {
    message: 'Tin nhắn không được vượt quá 500 ký tự.',
  }),
});

export default function ContactForm() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const contactSubmissionsCol = collection(firestore, 'contactSubmissions');
    const submissionData = {
        ...values,
        submissionDate: new Date().toISOString(),
    };

    addDoc(contactSubmissionsCol, submissionData)
    .then(() => {
        toast({
            title: 'Đã gửi thành công!',
            description: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ trả lời sớm nhất có thể.',
        });
        form.reset();
    })
    .catch((error) => {
        const permissionError = new FirestorePermissionError({
            path: contactSubmissionsCol.path,
            operation: 'create',
            requestResourceData: submissionData,
        });
        errorEmitter.emit('permission-error', permissionError);

        toast({
            variant: 'destructive',
            title: 'Ôi, đã có lỗi xảy ra!',
            description: 'Không thể gửi tin nhắn của bạn. Vui lòng thử lại sau.',
        });
    })
    .finally(() => {
        setIsSubmitting(false);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên của bạn</FormLabel>
              <FormControl>
                <Input placeholder="Nguyễn Văn A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tin nhắn</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Xin cho tôi hỏi về..."
                  className="resize-none"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
        </Button>
      </form>
    </Form>
  );
}
