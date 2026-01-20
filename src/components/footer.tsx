export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-6 border-t mt-auto bg-background/50">
      <div className="container mx-auto text-center text-sm text-foreground/80">
        <p>&copy; {new Date().getFullYear()} Our Sacred Place. All Rights Reserved.</p>
        <p className="mt-2">Built with Firebase and Next.js</p>
      </div>
    </footer>
  );
}
