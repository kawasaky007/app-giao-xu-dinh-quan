
import { Church, Menu } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';

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
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
