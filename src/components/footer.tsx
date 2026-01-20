
import { Church, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="w-full py-12 px-4 md:px-6 border-t bg-secondary/30">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-3 text-primary font-headline font-bold text-2xl mb-4">
            <Church className="w-8 h-8" />
            <span>Giáo Xứ Các Thánh TĐVN</span>
          </Link>
          <p className="text-foreground/80 max-w-sm">
            Một cộng đoàn đức tin, hy vọng và tình yêu. Mời bạn đến tham dự và hiệp thông.
          </p>
        </div>
        <div>
          <h3 className="font-headline text-xl font-bold text-primary mb-4">Liên Kết Nhanh</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-primary transition-colors">Trang Chủ</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Giới Thiệu</Link></li>
            <li><Link href="/schedule" className="hover:text-primary transition-colors">Lịch Phụng Vụ</Link></li>
            <li><Link href="/news" className="hover:text-primary transition-colors">Tin Tức</Link></li>
            <li><Link href="/events" className="hover:text-primary transition-colors">Sự Kiện</Link></li>
            <li><Link href="/gallery" className="hover:text-primary transition-colors">Hình Ảnh</Link></li>
            <li><Link href="/catechism" className="hover:text-primary transition-colors">Giáo Lý</Link></li>
            <li><Link href="/documents" className="hover:text-primary transition-colors">Tài Liệu</Link></li>
            <li><Link href="/faq" className="hover:text-primary transition-colors">Hỏi Đáp</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Dâng Cúng</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-xl font-bold text-primary mb-4">Liên Hệ</h3>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex items-center justify-center md:justify-start gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>123 Đường Đức Tin, TP. Tình Yêu, Việt Nam</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:028-3456-7890" className="hover:text-primary transition-colors">(028) 3456-7890</a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:lienhe@giaoxu.com" className="hover:text-primary transition-colors">lienhe@giaoxu.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center text-sm text-foreground/60 mt-12 border-t pt-8">
        <p>&copy; {new Date().getFullYear()} Giáo Xứ Các Thánh Tử Đạo Việt Nam. Mọi quyền được bảo lưu.</p>
        <p className="mt-1">Xây dựng với Firebase và Next.js</p>
      </div>
    </footer>
  );
}
