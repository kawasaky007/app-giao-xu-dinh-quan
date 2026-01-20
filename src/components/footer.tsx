import { Church, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="w-full py-12 px-4 md:px-6 border-t bg-secondary/30">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-3 text-primary font-headline font-bold text-2xl mb-4">
            <Church className="w-8 h-8" />
            <span>Our Sacred Place</span>
          </Link>
          <p className="text-foreground/80 max-w-sm">
            A community of faith, hope, and love. Join us for worship and fellowship.
          </p>
        </div>
        <div>
          <h3 className="font-headline text-xl font-bold text-primary mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="#quick-info" className="hover:text-primary transition-colors">Mass Times</Link></li>
            <li><Link href="#news" className="hover:text-primary transition-colors">News</Link></li>
            <li><Link href="#events" className="hover:text-primary transition-colors">Events</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Giving</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-xl font-bold text-primary mb-4">Contact Us</h3>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex items-center justify-center md:justify-start gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>123 Faith Street, Devotion, USA</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:123-456-7890" className="hover:text-primary transition-colors">(123) 456-7890</a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <a href="mailto:contact@oursacredplace.com" className="hover:text-primary transition-colors">contact@oursacredplace.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center text-sm text-foreground/60 mt-12 border-t pt-8">
        <p>&copy; {new Date().getFullYear()} Our Sacred Place. All Rights Reserved.</p>
        <p className="mt-1">Built with Firebase and Next.js</p>
      </div>
    </footer>
  );
}
