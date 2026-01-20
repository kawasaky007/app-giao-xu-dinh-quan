'use client';

import { Church, Menu } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import React from 'react';
import { cn } from '@/lib/utils';

const navGroups = [
  {
    title: "Về Giáo Xứ",
    links: [
      { href: '/about', label: 'Giới Thiệu', description: 'Lược sử, sứ mạng, và tầm nhìn của giáo xứ.' },
      { href: '/schedule', label: 'Lịch Phụng Vụ', description: 'Xem giờ lễ và các lịch sinh hoạt khác.' },
      { href: '/faq', label: 'Hỏi Đáp', description: 'Câu trả lời cho các câu hỏi thường gặp.' },
      { href: '/contact', label: 'Liên Hệ', description: 'Thông tin liên hệ và bản đồ đến giáo xứ.' },
    ]
  },
  {
    title: "Đời Sống Cộng Đoàn",
    links: [
      { href: '/news', label: 'Tin Tức', description: 'Cập nhật tin tức và thông báo mới nhất.' },
      { href: '/events', label: 'Sự Kiện', description: 'Tham gia các sự kiện sắp tới của giáo xứ.' },
      { href: '/gallery', label: 'Thư Viện', description: 'Xem hình ảnh và video về đời sống giáo xứ.' },
    ]
  },
  {
    title: "Tài Nguyên",
    links: [
      { href: '/catechism', label: 'Giáo Lý', description: 'Chương trình giáo lý cho mọi lứa tuổi.' },
      { href: '/documents', label: 'Tài Liệu', description: 'Tải các biểu mẫu và tài liệu quan trọng.' },
    ]
  }
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
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
             <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Trang Chủ
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            {navGroups.map((group) => (
                <NavigationMenuItem key={group.title}>
                    <NavigationMenuTrigger>{group.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {group.links.map((link) => (
                        <ListItem
                            key={link.label}
                            title={link.label}
                            href={link.href}
                        >
                            {link.description}
                        </ListItem>
                        ))}
                    </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

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
                <div className="flex flex-col h-full">
                   <div className="p-6">
                     <Link
                        href="/"
                        className="flex items-center gap-3 font-headline text-xl font-bold text-primary"
                    >
                        <Church className="h-8 w-8" />
                        <span>Giáo Xứ</span>
                    </Link>
                   </div>
                  <nav className="flex-1 px-4 overflow-y-auto">
                     <SheetClose asChild>
                        <Link href="/" className="block py-3 text-lg font-medium text-foreground transition-colors hover:text-primary">Trang Chủ</Link>
                    </SheetClose>
                    <Accordion type="multiple" className="w-full">
                        {navGroups.map((group) => (
                             <AccordionItem value={group.title} key={group.title}>
                                <AccordionTrigger className="py-3 text-lg font-medium">{group.title}</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="pl-4">
                                    {group.links.map(link => (
                                        <li key={link.href}>
                                            <SheetClose asChild>
                                                <Link href={link.href} className="block py-2 text-base text-muted-foreground hover:text-primary">{link.label}</Link>
                                            </SheetClose>
                                        </li>
                                    ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
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


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
