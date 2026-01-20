export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-6 border-t mt-auto bg-background/50">
      <div className="container mx-auto text-center text-sm text-foreground/60">
        <p>&copy; {new Date().getFullYear()} GiaoXu DinhQuan. Built with Firebase and Next.js.</p>
      </div>
    </footer>
  );
}
