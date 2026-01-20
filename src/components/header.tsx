import { Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 border-b shadow-sm bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-primary font-headline font-bold text-xl">
          <Shield className="w-6 h-6" />
          <span>GiaoXu DinhQuan</span>
        </Link>
        <Link href="/login" passHref>
          <Button>Login</Button>
        </Link>
      </div>
    </header>
  );
}
