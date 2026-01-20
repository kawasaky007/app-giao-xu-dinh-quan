import Footer from '@/components/footer';
import Header from '@/components/header';
import RbacDemo from '@/components/rbac-demo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1 w-full container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-3">
              GiaoXu DinhQuan
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-12">
              A demonstration of Role-Based Access Control using GenAI to interpret permissions.
            </p>
        </div>

        <RbacDemo />
        
      </main>
      <Footer />
    </div>
  );
}
