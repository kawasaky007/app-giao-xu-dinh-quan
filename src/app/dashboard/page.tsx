'use client';

import withAuth from '@/components/auth/withAuth';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useUser } from '@/firebase';
import { useUserRole } from '@/hooks/use-user-role';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function DashboardPage() {
    const { user } = useUser();
    const { role, isLoading: isRoleLoading } = useUserRole(user);

    return (
        <div className="flex flex-col min-h-screen bg-secondary/50 font-body">
            <Header />
            <main className="flex-1 py-16 md:py-24">
                <div className="container px-4 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8">
                        Trang Quản Trị
                    </h1>
                    <Card>
                        <CardHeader>
                            <CardTitle>Thông Tin Người Dùng</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || user.email || ''} />}
                                    <AvatarFallback>
                                        {user?.email?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-bold">{user?.displayName || 'Chưa có tên'}</h2>
                                    <p className="text-muted-foreground">{user?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-lg">
                                <Shield className="w-5 h-5 text-primary" />
                                <span className='font-semibold flex items-center gap-2'>
                                    Vai trò: 
                                    {isRoleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="font-bold capitalize">{role || 'Chưa được cấp'}</span>}
                                </span>
                            </div>
                             {role === 'admin' && (
                                <div>
                                    <h3 className="font-headline text-xl mb-2">Lối tắt Quản trị viên</h3>
                                    <Button asChild>
                                        <Link href="/admin">Quản lý người dùng</Link>
                                    </Button>
                                </div>
                             )}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}

// Protect this page, allowing access for admins, editors, and authors.
export default withAuth(DashboardPage, ['admin', 'editor', 'author']);
