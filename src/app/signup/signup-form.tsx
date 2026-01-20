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
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { createUserProfile, assignUserRole } from '@/lib/user';
import Link from 'next/link';

const formSchema = z.object({
  displayName: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự.' }),
  email: z.string().email({
    message: 'Vui lòng nhập một địa chỉ email hợp lệ.',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự.',
  }),
});

export default function SignUpForm() {
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: values.displayName,
      });

      await createUserProfile(firestore, user.uid, {
          email: user.email!,
          displayName: values.displayName,
      });
      // Gán vai trò 'admin' cho người dùng mới.
      // Trong ứng dụng thực tế, quy trình này cần được bảo mật hơn.
      await assignUserRole(firestore, user.uid, 'admin');

      toast({
        title: 'Tạo tài khoản thành công!',
        description: 'Đang chuyển hướng đến trang quản trị...',
      });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      let description = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          description = 'Địa chỉ email này đã được sử dụng.';
        } else if (error.code === 'auth/weak-password') {
            description = 'Mật khẩu quá yếu. Vui lòng chọn mật khẩu khác.';
        }
      } else if ((error as Error).message.includes('permission-denied')) {
        description = 'Không có quyền tạo người dùng. Vui lòng liên hệ quản trị viên.'
      }
      toast({
        variant: 'destructive',
        title: 'Đăng ký thất bại',
        description,
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên hiển thị</FormLabel>
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
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Đang tạo...' : 'Tạo Tài Khoản'}
        </Button>
        <p className="px-8 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{' '}
            <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
            >
                Đăng nhập
            </Link>
        </p>
      </form>
    </Form>
  );
}
