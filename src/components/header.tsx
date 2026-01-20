
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
  { href: '/#contact', label: 'Liên Hệ' },
];

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 border-b shadow-sm bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 text-primary font-headline font-bold text-xl md:text-2xl">
          <Church className="w-8 h-8" />
          <span className='hidden sm:inline'>Giáo Xứ Các Thánh TĐVN</span>
          <span className='sm:hidden'>GX Các Thánh TĐVN</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors">
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
                  <Link href="/" className="flex items-center gap-3 text-primary font-headline font-bold text-2xl">
                    <Church className="w-8 h-8" />
                    <span>Giáo Xứ</span>
                  </Link>
                  <nav className="grid gap-4">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-xl font-medium text-foreground hover:text-primary transition-colors">
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
