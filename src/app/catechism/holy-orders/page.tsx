import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HolyOrdersPage() {
    const image = PlaceHolderImages.find(p => p.id === 'sacrament-holy-orders');

    return (
        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-3xl">
                <Button asChild variant="ghost" className="mb-8">
                    <Link href="/catechism"><ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang Giáo lý</Link>
                </Button>
                
                <Card className="overflow-hidden">
                    {image && (
                        <div className="relative h-64 w-full bg-secondary">
                            <Image 
                                src={image.imageUrl} 
                                alt="Truyền Chức Thánh" 
                                fill
                                style={{ objectFit: 'cover' }}
                                className="w-full h-full object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-primary">Bí Tích Truyền Chức Thánh</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-lg dark:prose-invert max-w-none">
                        <h2>Phục Vụ Dân Chúa</h2>
                        <p>Bí tích Truyền Chức Thánh là bí tích mà qua đó sứ mạng Chúa Kitô đã ủy thác cho các Tông Đồ tiếp tục được thực thi trong Hội Thánh cho đến tận thế. Có ba cấp bậc: Giám mục, Linh mục và Phó tế.</p>
                        
                        <h3>Bạn có cảm thấy được mời gọi?</h3>
                        <p>Ơn gọi làm linh mục, phó tế hay tu sĩ là một hồng ân cao quý. Đó là một đời sống phục vụ, hy sinh và niềm vui sâu xa khi được trở nên giống Chúa Kitô, vị Mục Tử Nhân Lành.</p>
                        <p>Nếu bạn cảm thấy những thao thức trong lòng mình về một đời sống dâng hiến, đừng ngần ngại tìm kiếm sự hướng dẫn. Giáo xứ chúng ta luôn sẵn lòng đồng hành cùng bạn trên hành trình phân định ơn gọi.</p>

                        <h3>Bước tiếp theo</h3>
                        <p>Hãy bắt đầu bằng việc cầu nguyện, tham dự Thánh lễ thường xuyên và tham gia vào đời sống giáo xứ. Sau đó, hãy tìm đến một linh mục mà bạn tin tưởng để trò chuyện và nhận được sự linh hướng. Cha xứ và các cha phó luôn sẵn lòng lắng nghe và chia sẻ với bạn.</p>
                        
                        <div className="mt-8 not-prose">
                            <Button asChild>
                                <Link href="/contact">Trò chuyện với Linh mục</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
