import { Church } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 border-b shadow-sm bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 text-primary font-headline font-bold text-2xl">
          <Church className="w-8 h-8" />
          <span>Our Sacred Place</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
