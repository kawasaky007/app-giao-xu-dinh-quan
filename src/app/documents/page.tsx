import { getSermons, getDocuments } from '@/lib/resources';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { User, Calendar, PlayCircle, Youtube, Download } from 'lucide-react';
import Link from 'next/link';

export default async function DocumentsPage() {
  const sermons = await getSermons();
  const documents = await getDocuments();

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 max-w-5xl mx-auto">
        <Tabs defaultValue="sermons" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="sermons">Bài Giảng</TabsTrigger>
            <TabsTrigger value="newsletters">Bản Tin</TabsTrigger>
            <TabsTrigger value="forms">Biểu Mẫu</TabsTrigger>
          </TabsList>
          
          {/* Sermons Tab */}
          <TabsContent value="sermons">
            <div className="space-y-6">
              {sermons.map((sermon) => (
                <Card key={sermon.id} className="shadow-md">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{sermon.title}</CardTitle>
                    <CardDescription className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-1 pt-2">
                      <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {sermon.speaker}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(new Date(sermon.date), 'dd/MM/yyyy')}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    {sermon.audioUrl && (
                      <Link href={sermon.audioUrl} className="flex items-center gap-2 text-primary hover:underline">
                        <PlayCircle className="w-5 h-5" />
                        <span>Nghe</span>
                      </Link>
                    )}
                    {sermon.videoUrl && (
                        <Link href={sermon.videoUrl} className="flex items-center gap-2 text-primary hover:underline">
                        <Youtube className="w-5 h-5" />
                        <span>Xem</span>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Newsletters Tab */}
          <TabsContent value="newsletters">
            <Card>
              <CardHeader>
                <CardTitle>Bản Tin Hàng Tháng</CardTitle>
                <CardDescription>Cập nhật đời sống giáo xứ.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {documents.find(d => d.category === 'Bản tin')?.items.map((item, index) => (
                    <li key={index}>
                      <Link href={item.url} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md hover:bg-secondary">
                        <span className="font-medium text-foreground/90">{item.title}</span>
                        <Download className="w-5 h-5 text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms">
              <Card>
              <CardHeader>
                <CardTitle>Các Biểu Mẫu</CardTitle>
                <CardDescription>Các biểu mẫu thường dùng cho giáo dân.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {documents.find(d => d.category === 'Biểu mẫu')?.items.map((item, index) => (
                      <li key={index}>
                      <Link href={item.url} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md hover:bg-secondary">
                        <span className="font-medium text-foreground/90">{item.title}</span>
                        <Download className="w-5 h-5 text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
