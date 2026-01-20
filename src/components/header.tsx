'use client';

import { Church, Menu, LogIn, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { Button } from './ui/button';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useUserRole } from '@/hooks/use-user-role';


const navLinks = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/about', label: 'Giới Thiệu' },
  { href: '/schedule', label: 'Lịch Phụng Vụ' },
  { href: '/news', label: 'Tin Tức' },
  { href: '/events', label: 'Sự Kiện' },
  { href: '/gallery', label: 'Hình Ảnh' },
  { href: '/catechism', label: 'Giáo Lý' },
  { href: '/documents', label: 'Tài Liệu' },
  { href: '/faq', label: 'Hỏi Đáp' },
  { href: '/contact', label: 'Liên Hệ' },
];

export default function Header() {
  const { user, isUserLoading } = useUser();
  const { role } = useUserRole(user);
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <header className="w-full sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-headline text-lg font-bold text-primary md:text-xl"
        >
          <Church className="h-7 w-7 shrink-0" />
          <span className="hidden lg:inline">Giáo Xứ Các Thánh TĐVN</span>
          <span className="lg:hidden">GX Các Thánh TĐVN</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isUserLoading ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
          ) : user ? (
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
                    <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Trang quản trị</Link>
                </DropdownMenuItem>
                {role === 'admin' && (
                  <DropdownMenuItem asChild>
                      <Link href="/admin"><Shield className="mr-2 h-4 w-4" />Quản trị viên</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className='hidden md:inline-flex'>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" /> Đăng Nhập
              </Link>
            </Button>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Mở menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-6 p-6">
                  <Link
                    href="/"
                    className="flex items-center gap-3 font-headline text-xl font-bold text-primary"
                  >
                    <Church className="h-8 w-8" />
                    <span>Giáo Xứ</span>
                  </Link>
                  <nav className="grid gap-4">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  {!user && (
                    <>
                      <div className="border-t pt-6">
                        <SheetClose asChild>
                          <Button asChild className='w-full'>
                            <Link href="/login">
                              <LogIn className="mr-2 h-4 w-4" /> Đăng Nhập
                            </Link>
                          </Button>
                        </SheetClose>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
