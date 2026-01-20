'use client';

import withAuth from '@/components/auth/withAuth';
import { useUser, useAuth } from '@/firebase';
import { useUserRole } from '@/hooks/use-user-role';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, Loader2, LogOut, LayoutDashboard, Church } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';


function DashboardPage() {
    const { user } = useUser();
    const { role, isLoading: isRoleLoading } = useUserRole(user);
    const auth = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

    return (
        <div className="flex flex-col min-h-screen bg-secondary/50 font-body">
             <header className="w-full sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold text-primary md:text-xl">
                        <Church className="h-7 w-7 shrink-0" />
                        <span>Về Trang Chủ</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        {user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || user.email || ''} />
                                        <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.displayName || 'Người dùng'}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                        {user.email}
                                        </p>
                                    </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Trang Cá Nhân</Link>
                                    </DropdownMenuItem>
                                    {(role === 'admin' || role === 'editor') && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin"><Shield className="mr-2 h-4 w-4" />Bảng Điều Khiển</Link>
                                    </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Đăng xuất
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </header>
            <main className="flex-1 py-16 md:py-24">
                <div className="container px-4 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8">
                        Trang Cá Nhân
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
                             {(role === 'admin' || role === 'editor') && (
                                <div>
                                    <h3 className="font-headline text-xl mb-2">Lối tắt Quản trị viên</h3>
                                    <Button asChild>
                                        <Link href="/admin">Đi đến Bảng điều khiển</Link>
                                    </Button>
                                </div>
                             )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

// Protect this page, allowing access for admins, editors, and authors.
export default withAuth(DashboardPage, ['admin', 'editor', 'author']);
